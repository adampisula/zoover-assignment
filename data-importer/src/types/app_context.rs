use crate::config;

#[derive(Debug, Clone)]
pub struct AppContext {
    pub database_pool: sqlx::PgPool,
    pub config: config::Config,
}
