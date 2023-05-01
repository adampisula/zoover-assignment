from typing import List
from asyncpg import Connection, Pool, Record
from fastapi import HTTPException

from app.types.review import Review
from app.utils.review_conversions import review_record_to_type

async def get_all_reviews_for_accommodation(db_pool: Pool, slug: str) -> List[Review]:
    connection: Connection = await db_pool.acquire()
    
    async with connection.transaction():
        results: List[Record] = await connection.fetch("\
            SELECT r.*\
            FROM reviews r\
            INNER JOIN accommodations a\
            ON r.accommodation_id = a.id\
            WHERE a.slug = $1\
            ORDER BY created_at DESC;\
        ", slug)

        if results == None:
            raise HTTPException(status_code=500, detail="Error fetching accommodations")

        return [review_record_to_type(r) for r in results] 
