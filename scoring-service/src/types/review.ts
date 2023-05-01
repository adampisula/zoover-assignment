export type Review = {
  id: string;
  zooverReviewId: number;

  userName: string;
  title?: string;
  text: string;

  status: ReviewStatus;

  generalScore: number;
  scoreAspects: ReviewScoreAspects;

  createdAt: Date;
  updatedAt: Date;
};

export enum ReviewStatus {
  APPROVED = "approved",
  PENDING_APPROVAL = "pending_approval",
  REMOVED = "removed",
};

export type ReviewScoreAspects = {
  room?: number;
  food?: number;
  service?: number;
  location?: number;
  hygiene?: number;
  pool?: number;
  child_friendly?: number;
  price_quality?: number;
};
