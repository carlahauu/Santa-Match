from fastapi import FastAPI, Response, status, HTTPException, Depends
import psycopg
from psycopg import Connection
from . import models, schemas
from .database import engine, get_db
from sqlalchemy.orm import Session
from typing import List
from .routers import participants, groups

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(participants.router)
app.include_router(groups.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
