import { MILLISECONDS_IN_ONE_MONTH, WEIGHT_OLDER_THAN_TWO_YEARS } from "./constants";

export function calculateWeightByDate(review_date: Date, now: Date): number {
  const nowMilliseconds = now.getTime();
  const reviewDateMilliseconds = review_date.getTime();

  const deltaMilliseconds = nowMilliseconds - reviewDateMilliseconds;

  const deltaMonths = Math.floor(deltaMilliseconds / MILLISECONDS_IN_ONE_MONTH);

  if (deltaMonths > 24) {
    return WEIGHT_OLDER_THAN_TWO_YEARS;
  }

  const weight = Math.log(25 - deltaMonths);

  return weight;
}
