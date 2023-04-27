use crate::{controllers, types};

use actix_web::{post, web, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize, Debug)]
struct AccommodationsResponse {
    successful: Vec<String>,
    unsuccessful: Vec<String>, // maybe would be better as a map/tuple (slug, error)?
}

#[post("/accommodations")]
async fn accommodations_route(
    data: web::Data<types::AppContext>,
    body: web::Json<Vec<types::Accommodation>>,
) -> impl Responder {
    let context = data.get_ref().clone();
    let accommodations_input = body.into_inner();

    let entries_result =
        controllers::create_multiple_accommodations(context, accommodations_input).await;

    let mut successful_slugs = Vec::<String>::new();
    let mut unsuccessful_slugs = Vec::<String>::new();

    for er in entries_result.iter() {
        let slug = er.0.clone();

        if er.1.is_ok() {
            successful_slugs.push(slug);
        } else {
            let entry_error = er.1.as_ref().unwrap_err();

            println!(
                "Accommodations DB error (slug: {}): {:?}",
                slug, entry_error
            );

            unsuccessful_slugs.push(slug);
        }
    }

    if successful_slugs.is_empty() {
        return HttpResponse::Created().json(AccommodationsResponse {
            successful: successful_slugs,
            unsuccessful: unsuccessful_slugs,
        });
    }

    HttpResponse::BadRequest().json(AccommodationsResponse {
        successful: successful_slugs, // <- is equal to []
        unsuccessful: unsuccessful_slugs,
    })
}
