use std::collections::HashMap;

use crate::{controllers, types};

pub async fn create_multiple_accommodations(
    context: types::AppContext,
    accommodations: Vec<types::Accommodation>,
) -> HashMap<String, Result<(), sqlx::Error>> {
    let mut result_map = HashMap::<String, Result<(), sqlx::Error>>::new();

    for a in accommodations.iter() {
        let entry_result = controllers::create_accommodation(context.clone(), a.clone()).await;

        result_map.insert(
            a.slug.clone(),
            match entry_result.is_ok() {
                true => Ok(()),
                false => Err(entry_result.unwrap_err()),
            },
        );
    }

    result_map
}
