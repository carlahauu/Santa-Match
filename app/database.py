from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

if os.getenv('POSTGRES_HOST') in ["localhost", "127.0.0.1", None]:
    ssl_params = ""
else:
    ssl_params = "?sslmode=require&channel_binding=require"

SQLALCHEMY_DATABASE_URL = (
    f"postgresql+psycopg://"
    f"{os.getenv('POSTGRES_USER')}:"
    f"{os.getenv('POSTGRES_PASSWORD')}@"
    f"{os.getenv('POSTGRES_HOST')}/"
    f"{os.getenv('POSTGRES_DB')}?sslmode=require&channel_binding=require"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
