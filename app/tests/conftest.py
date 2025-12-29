import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app
from fastapi.testclient import TestClient
from ..rate_limiting import rate_limiter
import os
import random

random.seed(42)


@pytest.fixture
def standard_payload():
    return {
        "name": "Secret Santa",
        "budget": 100,
        "participants": [
            {"name": "Bob"},
            {"name": "Alice"},
            {"name": "Max"},
        ],
    }


@pytest.fixture
def db():
    if os.getenv("POSTGRES_HOST") in ["localhost", "127.0.0.1", None]:
        ssl_params = ""
    else:
        ssl_params = "?sslmode=require&channel_binding=require"

    SQLALCHEMY_DATABASE_URL = (
        f"postgresql+psycopg://"
        f"{os.getenv('POSTGRES_USER')}:"
        f"{os.getenv('POSTGRES_PASSWORD')}@"
        f"{os.getenv('POSTGRES_HOST')}/"
        f"{os.getenv('POSTGRES_DB')}{ssl_params}"
    )

    engine = create_engine(SQLALCHEMY_DATABASE_URL)

    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.create_all(bind=engine)
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            db.close()

    def override_rate_limiter():
        pass

    app.dependency_overrides[rate_limiter] = override_rate_limiter

    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)
