use serde::{Deserialize, Serialize};
use sqlx::FromRow;


#[derive(Debug, FromRow, Deserialize, Serialize)]
pub struct TimerGroup{
    pub timer_group_id: i32,
    pub name: String,
}