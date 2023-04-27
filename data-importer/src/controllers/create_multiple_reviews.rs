use std::collections::HashMap;

use crate::{controllers, types};

use super::create_review::CreateReviewControllerError;

pub async fn create_multiple_reviews(
    context: types::AppContext,
    reviews: Vec<types::Review>,
) -> HashMap<i32, Result<(), CreateReviewControllerError>> {
    let mut result_map = HashMap::<i32, Result<(), CreateReviewControllerError>>::new();

    for r in reviews.iter() {
        let entry_result = controllers::create_review_controller(context.clone(), r.clone()).await;

        result_map.insert(
            r.zoover_review_id,
            match entry_result.is_ok() {
                true => Ok(()),
                false => Err(entry_result.unwrap_err()),
            },
        );
    }

    result_map
}
