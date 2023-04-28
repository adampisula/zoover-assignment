from asyncpg import Pool
from fastapi import APIRouter, Request

from app.controllers.get_all_reviews import get_all_reviews_for_accommodation
from app.controllers.get_single_review import get_single_review_for_accommodation

review_router = APIRouter()

@review_router.get("/accommodation/{slug}/reviews")
async def all_reviews_route(request: Request, slug: str):
    db_pool: Pool = request.app.state.database_pool
    return await get_all_reviews_for_accommodation(db_pool, slug) 

@review_router.get("/accommodation/{slug}/review/{id}")
async def single_reviews_route(request: Request, slug: str, id: int):
    db_pool: Pool = request.app.state.database_pool
    return await get_single_review_for_accommodation(db_pool, slug, id) 
