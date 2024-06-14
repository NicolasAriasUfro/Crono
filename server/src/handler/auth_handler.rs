use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};

use crate::{
    dto::auth_dto::{LoginInput, RegisterInput, TokenPayload},
    error::{ApiError, ApiResult, Error},
    service::auth_service::AuthService,
    utils::{jwt, validate_payload},
    AppState
};


pub async fn login(
    State(state): State<AppState>,
    Json(payload): Json<LoginInput>,
) -> Result<impl IntoResponse, Error> {
    // Check if the user sent the credentials
    // if payload.email.is_empty() || payload.password.is_empty() {
    //     return ;
    // }

    validate_payload(&payload).expect("payload invalido.");

    let user = AuthService::sign_in(payload, &state)
        .await
        .map_err(|_| Error::WrongCredentials).expect("msg");
    let token = jwt::sign(user.user_account_id).expect("msg");
    let token_payload = TokenPayload { access_token: token, token_type: "".to_string() };
    Ok((StatusCode::OK, Json(token_payload)))
}

pub async fn register(
    State(state): State<AppState>,
    Json(input): Json<RegisterInput>,
) -> ApiResult<(StatusCode, Json<TokenPayload>)> {
    validate_payload(&input)?;
    let user = AuthService::sign_up(input, &state).await?;
    let token = jwt::sign(user.user_account_id)?;
    Ok((
        StatusCode::CREATED,
        Json(TokenPayload {
            access_token: token,
            token_type: "Bearer".to_string(),
        }),
    ))
}

#[derive(Debug, Deserialize)]
struct AuthPayload {
    client_id: String,
    client_secret: String,
}

#[derive(Debug, Serialize)]
struct AuthBody {
    access_token: String,
    token_type: String,
}

