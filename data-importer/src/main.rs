use actix_web::{web, HttpServer};
use sqlx::postgres::PgPoolOptions;
use types::AppContext;

mod config;
mod controllers;
mod models;
mod routes;
mod types;

#[actix_web::main]
async fn main() -> Result<(), ()> {
    let config = config::load();

    if config.is_err() {
        panic!("error loading config: {:?}", config.unwrap_err());
    }

    let config = config.unwrap(); // apparently using unwrap in production code is a big no-no, but
                                  // I have yet to learn how to do handle errors without it

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&config.database_url)
        .await;

    if pool.is_err() {
        panic!("Error connecting to database: {:?}", pool.unwrap_err());
    }

    let pool = pool.unwrap();

    let app_context: AppContext = AppContext {
        config: config.clone(),
        database_pool: pool.clone(),
    };

    let http_server = HttpServer::new(move || {
        let json_cfg = web::JsonConfig::default().limit(33_554_432);

        actix_web::App::new()
            .app_data(json_cfg)
            .app_data(web::Data::new(app_context.clone()))
            .service(routes::accommodation_route)
            .service(routes::accommodations_route)
            .service(routes::review_route)
            .service(routes::reviews_route)
    })
    .bind(("0.0.0.0", config.port));

    if http_server.is_err() {
        panic!("Error binding to port: {:?}", http_server.err());
    }

    println!("HTTP server listening on port {}", config.port);

    let http_server = http_server.unwrap();
    let run_result = http_server.run().await;

    if run_result.is_err() {
        panic!("Error running server: {:?}", run_result.unwrap_err());
    }

    Ok(())
}
