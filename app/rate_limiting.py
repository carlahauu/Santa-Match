import redis
from fastapi import status, HTTPException, Request
import os
from dotenv import load_dotenv

load_dotenv()

r = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    username="flying-ant",
    password=os.getenv("REDIS_PASSWORD"),
    port="15351",
    db=0,
    decode_responses=True,
    socket_timeout=2,
    socket_connect_timeout=2,
)


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
