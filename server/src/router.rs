use axum::{routing::{get, post}, Router};
use crate::{handler::{auth_handler::*, group_handler::*, timer_handler::get_timers}, AppState};

pub fn init_router(state: AppState) -> Router {
    Router::new()
        .route("/groups", get(get_groups))
        .route("/groups/:id", get(get_timers))
        .route("/login", post(login))
        .route("/register", post(register))
        .with_state(state)
}