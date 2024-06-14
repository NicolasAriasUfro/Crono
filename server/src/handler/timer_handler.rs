use axum::{extract::{Path, State}, http::StatusCode, response::IntoResponse, Json};

use crate::{error::Error, model::timer::Timer, AppState};

pub async fn get_timers(
    Path(timer_group_id): Path<i32>,
    State(state): State<AppState>
) -> Result<impl IntoResponse, Error> {
    match sqlx::query_as::<_, Timer>("SELECT * FROM timer WHERE timer_group_id = $1")
        .bind(timer_group_id)
        .fetch_one(&state.db)
        .await
    {
        Ok(timer) => Ok((StatusCode::OK, Json(timer))),
        Err(why) => Err(Error::SqlxError(why)),
    }
}