from dotenv import load_dotenv
import os

from fastapi import FastAPI
import asyncpg

from app.routers.accommodation import accommodation_router
from app.routers.review import review_router

load_dotenv()

app = FastAPI()

# Routers
app.include_router(accommodation_router)
app.include_router(review_router)

# Add shared database pool to app object
@app.on_event("startup")
async def startup():
    app.state.database_pool = await asyncpg.create_pool(dsn=os.getenv("DATABASE_URL"))


