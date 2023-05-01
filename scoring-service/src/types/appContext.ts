import { ReviewRepository } from "./reviewRepository";

export type AppContext = {
  repositories: {
    Review: ReviewRepository;
  };
};
