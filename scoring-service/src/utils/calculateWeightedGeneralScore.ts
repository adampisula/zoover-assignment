import { Review } from "../types/review";
import { calculateWeightByDate } from "./calculateWeightByDate";

export function calculateWeightedGeneralScore(reviews: Review[], now_date?: Date): number {
  if (reviews.length == 0) {
    throw new Error("no reviews available");
  }

  const now = now_date || new Date();

  const weightedGeneralScores = reviews.map(r => {
    const weight = calculateWeightByDate(r.createdAt, now);
    return weight * r.generalScore;
  });

  const weightedSum = weightedGeneralScores.reduce((previous, next) => previous + next); // Sum all elements
  return weightedSum / reviews.length; // And return the average
}
