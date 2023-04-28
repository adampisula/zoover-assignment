from datetime import datetime
from uuid import UUID

class AccommodationAddress:
    zipcode: str
    street: str

class Accommodation:
    id: UUID
    name: str
    slug: str

    address: AccommodationAddress

    created_at: datetime
    updated_at: datetime

