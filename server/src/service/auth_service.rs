use sqlx::PgPool;

use crate::{
    dto::auth_dto::{LoginInput, RegisterInput},
    error::{Error, Result},
    model::user::User,
    utils::encryption, AppState,
};

pub struct AuthService;

impl AuthService {
    pub async fn sign_in(input: LoginInput, state: &AppState) -> Result<User> {
        let user = User::find_by_email(&input.email, &state).await?;
        if encryption::verify_password(input.password, user.password.to_owned()).await? {
            Ok(user)
        } else {
            Err(Error::WrongPassword)
        }
    }

    pub async fn sign_up(input: RegisterInput, state: &AppState) -> Result<User> {
        if User::find_by_email(&input.email, &state).await.is_ok() {
            return Err(Error::DuplicateUserEmail);
        }
        if User::find_by_name(&input.name, &state).await.is_ok() {
            return Err(Error::DuplicateUserName);
        }

        let data = User::new(input.name, input.email, encryption::hash_password(input.password).await?);
        Ok(User::create(data, &state).await?)
    }
}