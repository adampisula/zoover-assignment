use crate::{models, types};

pub async fn create_accommodation(
    context: types::AppContext,
    accommodation: types::Accommodation,
) -> Result<String, sqlx::Error> {
    // ^ normally there should be a custom error here
    let accommodation_model = models::AccommodationModel::from(accommodation);

    accommodation_model.save(context).await
}
