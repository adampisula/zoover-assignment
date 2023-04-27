use crate::types;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, sqlx::Type)]
#[sqlx(type_name = "review_status")]
pub enum ReviewModelStatus {
    #[sqlx(rename = "approved")]
    Approved,
    #[sqlx(rename = "pending_approval")]
    PendingApproval,
    #[sqlx(rename = "removed")]
    Removed,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ReviewModelScoreAspects {
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

#[derive(Debug, sqlx::FromRow)]
pub struct ReviewModel {
    pub id: sqlx::types::Uuid,
    pub zoover_review_id: i32,

    pub accommodation_id: sqlx::types::Uuid,

    pub user_name: String,

    pub title: Option<String>,
    pub text: String,
    pub status: ReviewModelStatus,

    pub general_score: f32,
    pub score_aspects: sqlx::types::JsonValue,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl ReviewModel {
    pub fn from(review: types::Review) -> Result<ReviewModel, serde_json::Error> {
        let score_aspects =
            serde_json::from_str::<types::ReviewScoreAspects>(review.score_aspects.as_str())?;

        Ok(ReviewModel {
            id: review.id,
            zoover_review_id: review.zoover_review_id,

            accommodation_id: review.accommodation_id,

            user_name: review.user_name,

            title: review.title,
            text: review.text,
            status: match review.status {
                types::ReviewStatus::Approved => ReviewModelStatus::Approved,
                types::ReviewStatus::PendingApproval => ReviewModelStatus::PendingApproval,
                types::ReviewStatus::Removed => ReviewModelStatus::Removed,
            },

            general_score: review.general_score,
            score_aspects: json!(ReviewModelScoreAspects {
                room: score_aspects.room,
                food: score_aspects.food,
                service: score_aspects.service,
                location: score_aspects.location,
                hygiene: score_aspects.hygiene,
                pool: score_aspects.pool,
                child_friendly: score_aspects.child_friendly,
                price_quality: score_aspects.price_quality,
            }),

            created_at: review.created_at,
            updated_at: review.updated_at,
        })
    }

    pub async fn save(self, context: types::AppContext) -> Result<i32, sqlx::Error> {
        let mut conn = context.database_pool.acquire().await?;

        let new_review_zoover_id = sqlx::query!(
            "INSERT INTO reviews
            (id, zoover_review_id, accommodation_id, user_name, title, text, status, general_score, score_aspects, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING zoover_review_id;",
            self.id,
            self.zoover_review_id,
            self.accommodation_id,
            self.user_name,
            self.title,
            self.text,
            self.status as ReviewModelStatus,
            self.general_score,
            self.score_aspects,
            self.created_at,
            self.updated_at,
        )
        .fetch_one(&mut conn)
        .await?
        .zoover_review_id;

        Ok(new_review_zoover_id)
    }
}
