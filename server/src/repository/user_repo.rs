use sqlx::PgPool;

use crate::{
    error::Result, model::user::User, AppState
};


impl User {
    pub async fn find_by_id(id: i32, state: &AppState) -> Result<User> {
        let sql = format!("SELECT * FROM user_account WHERE id = $1 LIMIT 1");
        Ok(sqlx::query_as::<_, User>(&sql).bind(id).fetch_one(&state.db).await?)
    }

    pub async fn find_by_email(email: &str, state: &AppState) -> Result<User> {
        let sql = format!("SELECT * FROM user_account WHERE email = $1 LIMIT 1");
        Ok(sqlx::query_as(&sql).bind(email).fetch_one(&state.db).await?)
    }

    pub async fn find_by_name(name: &str, state: &AppState) -> Result<User> {
        let sql = format!("SELECT * FROM user_account WHERE name = $1 LIMIT 1");
        Ok(sqlx::query_as(&sql).bind(name).fetch_one(&state.db).await?)
    }

    pub async fn create(data: User, state: &AppState) -> Result<User> {
        let sql = format!(
            "
            INSERT INTO user_account (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
            ",
        );
        let user = sqlx::query_as(&sql)
        .bind(data.name)
        .bind(data.email)
        .bind(data.password)
        .fetch_one(&state.db)
        .await.expect("some error");

        Ok(user)
        
    }
}