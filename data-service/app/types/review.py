from datetime import datetime
from enum import Enum
from uuid import UUID

class ReviewStatus(str, Enum):
    APPROVED = "approved"
    PENDING_APPROVAL = "pending_approval"
    REMOVED = "removed"

class ReviewScoreAspects:
    room: int | None
    food: int | None
    service: int | None
    location: int | None
    hygiene: int | None
    pool: int | None
    child_friendly: int | None
    price_quality: int | None

class Review:
    id: UUID
    zoover_review_id: int

    accomodation_id: UUID

    user_name: str

    title: str | None
    text: str
    status: ReviewStatus

    general_score: float
    score_aspects: ReviewScoreAspects
    
    created_at: datetime
    updated_at: datetime

