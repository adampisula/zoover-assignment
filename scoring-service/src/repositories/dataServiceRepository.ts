import { Review } from "../types/review";
import { ReviewRepository } from "../types/reviewRepository";

import axios from "axios";

export class DataServiceReviewRepository implements ReviewRepository {
  constructor() { }

  async getAllForAccommodation(slug: string): Promise<Review[]> {
    const response = await axios.get(`${process.env.DATA_SERVICE_URL}/accommodation/${slug}/reviews`);

    const reviews: Review[] = (response.data as any[]).map(review => ({
      id: review["id"],
      zooverReviewId: review["zoover_review_id"],

      userName: review["user_name"],
      title: review["title"],
      text: review["text"],

      status: review["status"],

      generalScore: review["general_score"],
      scoreAspects: review["score_aspects"],

      createdAt: new Date(review["created_at"]),
      updatedAt: new Date(review["updated_at"]),
    }));

    return reviews;
  }
}
