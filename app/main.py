from fastapi import FastAPI
from . import models
from .database import engine
from .routers import participants, groups
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(participants.router)
app.include_router(groups.router)


@app.get("/")
def root():
    return {"message": "Hello World"}


Instrumentator().instrument(app).expose(app)
