use crate::{controllers, types};

use actix_web::{post, web, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize, Debug)]
struct AccommodationResponse {
    error: Option<String>,
    slug: Option<String>,
}

#[post("/accommodation")]
async fn accommodation_route(
    data: web::Data<types::AppContext>,
    body: web::Json<types::Accommodation>,
) -> impl Responder {
    let context = data.get_ref().clone();
    let accommodation_input = body.into_inner();

    let new_accommodation_slug =
        controllers::create_accommodation(context, accommodation_input).await;

    if new_accommodation_slug.is_err() {
        let new_accommodation_slug_error = new_accommodation_slug.unwrap_err();

        println!("Accommodation DB error: {:?}", new_accommodation_slug_error);

        return match new_accommodation_slug_error {
            // handle other error types
            _ => HttpResponse::InternalServerError().json(AccommodationResponse {
                error: Some(
                    "there has been an error while saving accommodation to the database"
                        .to_string(),
                ),
                slug: None,
            }),
        };
    }

    let new_accommodation_slug = new_accommodation_slug.unwrap();

    HttpResponse::Created().json(AccommodationResponse {
        error: None,
        slug: Some(new_accommodation_slug),
    })
}
