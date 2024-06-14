use serde::{Deserialize, Serialize};
use sqlx::FromRow;


#[derive(Debug, FromRow, Deserialize, Serialize)]
pub struct Timer{
    pub timer_id: i32,
    pub name: String,
    pub seconds: i32,
    pub timer_group_id: i32,
}