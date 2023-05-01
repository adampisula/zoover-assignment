import { AppContext } from "../types/appContext";
import { ReviewScoreAspects } from "../types/review";
import { calculateWeightedGeneralScore } from "../utils/calculateWeightedGeneralScore";
import { calculateWeightedScoreAspects } from "../utils/calculateWeightedScoreAspects";
import { getAllReviewsForAccommodationController } from "./getAllReviewsForAccommodation";

type CombinedScore = {
  score: number;
  scoreAspects: ReviewScoreAspects;
};

export async function getCombinedScoreForAccommodation(context: AppContext, slug: string): Promise<CombinedScore> {
  const reviews = await getAllReviewsForAccommodationController(context, slug);
  const weightedGeneralScore = calculateWeightedGeneralScore(reviews);
  const weightedScoreAspects = calculateWeightedScoreAspects(reviews);

  return {
    score: weightedGeneralScore,
    scoreAspects: weightedScoreAspects,
  };
}
