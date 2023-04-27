use chrono::{DateTime, Utc};

use crate::types;

#[derive(Clone, Debug, sqlx::FromRow)]
pub struct AccommodationModel {
    pub id: sqlx::types::Uuid,

    pub name: String,
    pub slug: String,

    #[sqlx(rename = "address__zipcode")]
    pub address_zipcode: String,
    #[sqlx(rename = "address__street")]
    pub address_street: String,

    #[sqlx(rename = "_created_at")]
    pub created_at: DateTime<Utc>,
    #[sqlx(rename = "_updated_at")]
    pub updated_at: DateTime<Utc>,
}

impl AccommodationModel {
    pub fn from(accommodation: types::Accommodation) -> AccommodationModel {
        AccommodationModel {
            id: accommodation.id,

            name: accommodation.name,
            slug: accommodation.slug,

            address_zipcode: accommodation.address.zipcode,
            address_street: accommodation.address.street,

            created_at: accommodation.created_at,
            updated_at: accommodation.updated_at,
        }
    }

    pub async fn save(self, context: types::AppContext) -> Result<String, sqlx::Error> {
        let mut conn = context.database_pool.acquire().await?;

        let new_accommodation_slug = sqlx::query!(
            "INSERT INTO accommodations
            (id, name, slug, address__zipcode, address__street, _created_at, _updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING slug;",
            self.id,
            self.name,
            self.slug,
            self.address_zipcode,
            self.address_street,
            self.created_at,
            self.updated_at,
        )
        .fetch_one(&mut conn)
        .await?
        .slug;

        Ok(new_accommodation_slug)
    }
}
