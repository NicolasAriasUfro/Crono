use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};

use crate::{error::{self, Error}, model::timer_group::{self, TimerGroup}, AppState};

pub async fn get_groups(
    State(state): State<AppState>
) -> Result<impl IntoResponse, Error> {
    match sqlx::query_as::<_, TimerGroup>("SELECT * FROM timer_group")
        .fetch_all(&state.db)
        .await
    {
        Ok(timer_group) => Ok((StatusCode::OK, Json(timer_group))),
        Err(why) => Err(Error::SqlxError(why)),
    }
}