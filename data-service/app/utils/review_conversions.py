from typing import Any

from asyncpg import Record
from app.types.review import Review, ReviewScoreAspects
import json

def review_record_to_type(record: Record) -> Review:
    review = Review()

    review.id = record["id"]
    review.zoover_review_id = record["zoover_review_id"]

    review.user_name = record["user_name"]

    review.title = record["title"]
    review.text = record["text"]
    review.status = record["status"]

    review.general_score = record["general_score"]
    review.score_aspects = score_aspects_str_to_type(record["score_aspects"])

    review.created_at = record["created_at"]
    review.updated_at = record["updated_at"]

    return review

def score_aspects_str_to_type(sa_json: str) -> ReviewScoreAspects:
    parsed = json.loads(sa_json)

    score_aspects = ReviewScoreAspects()

    score_aspects.room = _get_value_with_default(parsed, "room")
    score_aspects.food = _get_value_with_default(parsed, "food")
    score_aspects.service = _get_value_with_default(parsed, "service")
    score_aspects.location = _get_value_with_default(parsed, "location")
    score_aspects.hygiene = _get_value_with_default(parsed, "hygiene")
    score_aspects.pool = _get_value_with_default(parsed, "pool")
    score_aspects.child_friendly = _get_value_with_default(parsed, "childFriendly")
    score_aspects.price_quality = _get_value_with_default(parsed, "priceQuality")

    return score_aspects

def _get_value_with_default(obj: Any, key: str, default = None):
    try:
        return obj[key]
    except:
        return default

