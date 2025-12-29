from fastapi import FastAPI
from . import models
import redis
from fastapi import FastAPI, status, HTTPException, Request
from .database import engine
from .routers import participants, groups
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

app = FastAPI()


async def rate_limiter(request: Request):
    client_ip = request.client.host
    key = f"rate_limit:{client_ip}"
    limit = 5
    window = 60

    current_usage = r.incr(key)

    if current_usage == 1:
        r.expire(key, window)

    if current_usage > limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again in a minute.",
        )


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
