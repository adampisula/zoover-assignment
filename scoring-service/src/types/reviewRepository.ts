import { Review } from "./review";

export interface ReviewRepository {
  getAllForAccommodation(slug: string): Promise<Review[]>;
}
