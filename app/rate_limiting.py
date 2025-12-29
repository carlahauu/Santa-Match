import redis
from fastapi import FastAPI, status, HTTPException, Request

r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)


async def rate_limiter(request: Request):
    client_ip = request.client.host
    key = f"rate_limit:{client_ip}"
    limit = 5
    window = 60

    current_usage = r.incr(key)

    if current_usage == 1:
        r.expire(key, window)

    if current_usage >= limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again in a minute.",
        )
