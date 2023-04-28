from typing import List
from asyncpg import Connection, Pool, Record
from fastapi import HTTPException

from app.types.accommodation import Accommodation 
from app.utils.accommodation_conversions import accommodation_record_to_type

async def get_all_accommodations(db_pool: Pool) -> List[Accommodation]:
    connection: Connection = await db_pool.acquire()
    
    async with connection.transaction():
        results: List[Record] = await connection.fetch("\
            SELECT id, name, slug, address__zipcode, address__street, _created_at, _updated_at \
            FROM accommodations;\
        ")

        if results == None:
            raise HTTPException(status_code=500, detail="Error fetching accommodations")

        return [accommodation_record_to_type(r) for r in results] 
