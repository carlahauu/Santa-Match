import os
from datetime import datetime, timedelta, timezone
from sqlalchemy import create_engine, Table, MetaData, delete
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import ssl

load_dotenv()

db_user = os.getenv("POSTGRES_USER")
db_pass = os.getenv("POSTGRES_PASSWORD")
db_host = os.getenv("POSTGRES_HOST")
db_name = os.getenv("POSTGRES_DB")

ssl_context = None
if db_host not in ["localhost", "127.0.0.1", None]:
    ssl_context = ssl.create_default_context()

SQLALCHEMY_DATABASE_URL = f"postgresql+pg8000://{db_user}:{db_pass}@{db_host}/{db_name}"

connect_args = {}
if ssl_context:
    connect_args["ssl_context"] = ssl_context

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()


def delete_old_rows(session, table_name, column_name, cutoff_time):
    table = Table(table_name, metadata, autoload_with=engine)

    stmt = delete(table).where(table.c[column_name] < cutoff_time)

    result = session.execute(stmt)
    return result.rowcount


def lambda_handler(event, context):
    column_name = os.getenv("COLUMN_NAME", "created_at")
    cutoff_time = datetime.now(timezone.utc) - timedelta(days=1)

    tables = ["participants", "groups"]

    session = SessionLocal()
    total_deleted = 0
    deletion_summary = {}

    try:
        ALLOWED_TABLES = ["participants", "groups"]

        for table_name in tables:
            if table_name not in ALLOWED_TABLES:
                raise ValueError(f"Invalid table name: {table_name}")
            deleted_rows = delete_old_rows(
                session, table_name, column_name, cutoff_time
            )
            deletion_summary[table_name] = deleted_rows
            total_deleted += deleted_rows
            print(f"Deleted {deleted_rows} rows from {table_name}")

        session.commit()

        message = f"Total deleted: {total_deleted} rows. Details: {deletion_summary}"
        print(message)

        return {"statusCode": 200, "body": message, "details": deletion_summary}

    except Exception as e:
        print(f"Error deleting rows: {e}")
        session.rollback()
        return {"statusCode": 500, "body": f"Error: {str(e)}"}

    finally:
        session.close()
