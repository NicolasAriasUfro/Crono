mod handler;
mod router;
mod model;
mod utils;
mod dto;
mod service;
mod error;
mod repository;

use router::init_router;
use sqlx::PgPool;

#[derive(Clone)]
struct AppState {
    db: PgPool
}

#[shuttle_runtime::main]
async fn main(#[shuttle_shared_db::Postgres(

)] db: PgPool,) -> shuttle_axum::ShuttleAxum {
    dotenv::dotenv().ok();
    sqlx::migrate!()
        .run(&db)
        .await
        .expect("Failed to run migrations");
    let state = AppState { db };
    let router = init_router(state);

    Ok(router.into())
}
