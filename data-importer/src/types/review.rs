use chrono::{DateTime, Utc};
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize, Debug, Clone)]
pub enum ReviewStatus {
    #[serde(rename = "approved")]
    Approved,
    #[serde(rename = "pending_approval")]
    PendingApproval,
    #[serde(rename = "removed")]
    Removed,
}

#[derive(Deserialize, Debug, Clone)]
pub struct ReviewScoreAspects {
    pub room: Option<i32>,
    pub food: Option<i32>,
    pub service: Option<i32>,
    pub location: Option<i32>,
    pub hygiene: Option<i32>,
    pub pool: Option<i32>,
    #[serde(rename = "childFriendly")]
    pub child_friendly: Option<i32>,
    #[serde(rename = "priceQuality")]
    pub price_quality: Option<i32>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Review {
    pub id: Uuid,
    #[serde(rename = "zooverReviewId")]
    pub zoover_review_id: i32,

    #[serde(rename = "accommodationId")]
    pub accommodation_id: Uuid,

    #[serde(rename = "userName")]
    pub user_name: String,

    pub title: Option<String>,
    pub text: String,
    pub status: ReviewStatus,

    #[serde(rename = "generalScore")]
    pub general_score: f32,
    #[serde(rename = "scoreAspects")]
    pub score_aspects: String,

    #[serde(rename = "createdAt")]
    pub created_at: DateTime<Utc>,
    #[serde(rename = "updatedAt")]
    pub updated_at: DateTime<Utc>,
}
