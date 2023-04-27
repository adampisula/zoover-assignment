use crate::{controllers, types};

use actix_web::{post, web, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize, Debug)]
struct ReviewResponse {
    error: Option<String>,
    id: Option<i32>,
}

#[post("/review")]
async fn review_route(
    data: web::Data<types::AppContext>,
    body: web::Json<types::Review>,
) -> impl Responder {
    let context = data.get_ref().clone();
    let review_input = body.into_inner();

    let new_review_id = controllers::create_review_controller(context, review_input).await;

    if new_review_id.is_err() {
        let new_review_id_error = new_review_id.unwrap_err();

        println!("Review DB error: {:?}", new_review_id_error);

        return match new_review_id_error {
            // handle other error types
            _ => HttpResponse::InternalServerError().json(ReviewResponse {
                error: Some(
                    "there has been an error while saving review to the database".to_string(),
                ),
                id: None,
            }),
        };
    }

    let new_review_id = new_review_id.unwrap();

    HttpResponse::Created().json(ReviewResponse {
        error: None,
        id: Some(new_review_id),
    })
}
