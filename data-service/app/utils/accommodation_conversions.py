from asyncpg import Record

from app.types.accommodation import Accommodation, AccommodationAddress

def accommodation_record_to_type(record: Record) -> Accommodation:
    accommodation = Accommodation()
   
    accommodation.id = record["id"]
    accommodation.name = record["name"]
    accommodation.slug = record["slug"]

    accommodation.address = AccommodationAddress()
    accommodation.address.zipcode = record["address__zipcode"]
    accommodation.address.street = record["address__street"]

    accommodation.created_at = record["_created_at"]
    accommodation.updated_at = record["_updated_at"]
    
    return accommodation

