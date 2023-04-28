from asyncpg import Connection, Pool, Record
from fastapi import HTTPException

from app.types.accommodation import Accommodation 
from app.utils.accommodation_conversions import accommodation_record_to_type

async def get_accommodation(db_pool: Pool, slug: str) -> Accommodation:
    connection: Connection = await db_pool.acquire()
    
    async with connection.transaction():
        result: Record = await connection.fetchrow("\
            SELECT id, name, slug, address__zipcode, address__street, _created_at, _updated_at \
            FROM accommodations \
            WHERE slug = $1;\
        ", slug)

        if result == None:
            raise HTTPException(status_code=404, detail="Accommodation not found")

        return accommodation_record_to_type(result) 
