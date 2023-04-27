use crate::{controllers, types};

use actix_web::{post, web, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize, Debug)]
struct ReviewsResponse {
    successful: Vec<i32>,
    unsuccessful: Vec<i32>, // maybe would be better as a map/tuple (id, error)?
}

#[post("/reviews")]
async fn reviews_route(
    data: web::Data<types::AppContext>,
    body: web::Json<Vec<types::Review>>,
) -> impl Responder {
    let context = data.get_ref().clone();
    let reviews_input = body.into_inner();

    let entries_result = controllers::create_multiple_reviews(context, reviews_input).await;

    let mut successful_ids = Vec::<i32>::new();
    let mut unsuccessful_ids = Vec::<i32>::new();

    for er in entries_result.iter() {
        let id = *er.0;

        if er.1.is_ok() {
            successful_ids.push(id);
        } else {
            let entry_error = er.1.as_ref().unwrap_err();

            println!("Reviews DB error (id: {}): {:?}", id, entry_error);

            unsuccessful_ids.push(id);
        }
    }

    if successful_ids.is_empty() {
        return HttpResponse::Created().json(ReviewsResponse {
            successful: successful_ids,
            unsuccessful: unsuccessful_ids,
        });
    }

    HttpResponse::BadRequest().json(ReviewsResponse {
        successful: successful_ids, // <- is equal to []
        unsuccessful: unsuccessful_ids,
    })
}
