import { Review, ReviewScoreAspects } from "../types/review";
import { calculateWeightByDate } from "./calculateWeightByDate";

export function calculateWeightedScoreAspects(reviews: Review[], now_date?: Date): ReviewScoreAspects {
  if (reviews.length == 0) {
    throw new Error("no reviews available");
  }

  const perAspectCount: ReviewScoreAspects = {
    room: 0,
    food: 0,
    service: 0,
    location: 0,
    hygiene: 0,
    pool: 0,
    child_friendly: 0,
    price_quality: 0,
  };

  const now = now_date || new Date();

  const weightedScoreAspects: ReviewScoreAspects[] = reviews.map(r => {
    const weight = calculateWeightByDate(r.createdAt, now);

    const {
      room,
      food,
      service,
      location,
      hygiene,
      pool,
      child_friendly: childFriendly,
      price_quality: priceQuality,
    } = r.scoreAspects;

    if (room) perAspectCount.room! += 1;
    if (food) perAspectCount.food! += 1;
    if (service) perAspectCount.service! += 1;
    if (location) perAspectCount.location! += 1;
    if (hygiene) perAspectCount.hygiene! += 1;
    if (pool) perAspectCount.pool! += 1;
    if (childFriendly) perAspectCount.child_friendly! += 1;
    if (priceQuality) perAspectCount.price_quality! += 1;

    return {
      room: weight * (room ?? 0),
      food: weight * (food ?? 0),
      service: weight * (service ?? 0),
      location: weight * (location ?? 0),
      hygiene: weight * (hygiene ?? 0),
      pool: weight * (pool ?? 0),
      child_friendly: weight * (childFriendly ?? 0),
      price_quality: weight * (priceQuality ?? 0),
    };
  });

  const weightedSums = weightedScoreAspects.reduce((previous, next): ReviewScoreAspects => ({
    room: previous.room! + next.room!,
    food: previous.food! + next.food!,
    service: previous.service! + next.service!,
    location: previous.location! + next.location!,
    hygiene: previous.hygiene! + next.hygiene!,
    pool: previous.pool! + next.pool!,
    child_friendly: previous.child_friendly! + next.child_friendly!,
    price_quality: previous.price_quality! + next.price_quality!,
  })); // Sum all elements

  return {
    room: weightedSums.room! / perAspectCount.room!,
    food: weightedSums.food! / perAspectCount.food!,
    service: weightedSums.service! / perAspectCount.service!,
    location: weightedSums.location! / perAspectCount.location!,
    hygiene: weightedSums.hygiene! / perAspectCount.hygiene!,
    pool: weightedSums.pool! / perAspectCount.pool!,
    child_friendly: weightedSums.child_friendly! / perAspectCount.child_friendly!,
    price_quality: weightedSums.price_quality! / perAspectCount.price_quality!,
  }; // And return the average
}
