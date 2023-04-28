from typing import List
from asyncpg import Connection, Pool, Record
from fastapi import HTTPException

from app.types.review import Review
from app.utils.review_conversions import review_record_to_type

async def get_single_review_for_accommodation(db_pool: Pool, slug: str, id: int) -> Review:
    connection: Connection = await db_pool.acquire()
    
    async with connection.transaction():
        result: Record = await connection.fetchrow("\
            SELECT r.*\
            FROM reviews r\
            INNER JOIN accommodations a\
            ON r.accommodation_id = a.id\
            WHERE a.slug = $1 AND r.zoover_review_id = $2;\
        ", slug, id)

        if result == None:
            raise HTTPException(status_code=404, detail="Review not found for accommodation")

        return review_record_to_type(result)
