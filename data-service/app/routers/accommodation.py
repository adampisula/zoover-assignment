from asyncpg import Pool
from fastapi import APIRouter, Request

from app.controllers.get_accommodation import get_accommodation
from app.controllers.get_all_accommodations import get_all_accommodations

accommodation_router = APIRouter()

@accommodation_router.get("/accommodation/{slug}")
async def accommodation_route(request: Request, slug: str):
    db_pool: Pool = request.app.state.database_pool
    return await get_accommodation(db_pool, slug) 

@accommodation_router.get("/accommodations")
async def accommodations_route(request: Request):
    db_pool: Pool = request.app.state.database_pool
    return await get_all_accommodations(db_pool)
