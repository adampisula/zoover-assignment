import { AppContext } from "../types/appContext";
import { Review, ReviewStatus } from "../types/review";

export async function getAllReviewsForAccommodationController(context: AppContext, slug: string): Promise<Review[]> {
  const { repositories } = context;

  try {
    const reviews = await repositories.Review.getAllForAccommodation(slug);
    const filteredApprovedReviews = reviews.filter(r => r.status == ReviewStatus.APPROVED);

    return filteredApprovedReviews;
  } catch (err) {
    console.log(err);

    // handle different error types here
    throw new Error("there has been an error");
  }
}
