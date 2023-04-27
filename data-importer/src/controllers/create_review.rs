use crate::{models, types};

#[derive(Debug)]
pub enum CreateReviewControllerError {
    DatabaseError(sqlx::Error),
    ParseError(serde_json::Error),
}

pub async fn create_review_controller(
    context: types::AppContext,
    review: types::Review,
) -> Result<i32, CreateReviewControllerError> {
    let review_model = models::ReviewModel::from(review);

    if review_model.is_err() {
        return Err(CreateReviewControllerError::ParseError(
            review_model.unwrap_err(),
        ));
    }

    let review_model = review_model.unwrap();

    let review_id = review_model.save(context).await;

    if review_id.is_err() {
        return Err(CreateReviewControllerError::DatabaseError(
            review_id.unwrap_err(),
        ));
    }

    Ok(review_id.unwrap())
}
