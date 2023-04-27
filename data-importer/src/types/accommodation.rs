use chrono::{DateTime, Utc};
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize, Debug, Clone)]
pub struct Accommodation {
    pub id: Uuid,

    pub name: String,
    pub slug: String,

    pub address: Address,

    #[serde(rename = "_createdAt")]
    pub created_at: DateTime<Utc>,
    #[serde(rename = "_updatedAt")]
    pub updated_at: DateTime<Utc>,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Address {
    pub zipcode: String,
    pub street: String,
}
