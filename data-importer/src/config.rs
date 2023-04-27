use envconfig::Envconfig;

#[derive(Envconfig, Debug, Clone)]
pub struct Config {
    #[envconfig(from = "DATABASE_URL")]
    pub database_url: String,

    #[envconfig(from = "PORT")]
    pub port: u16,
}

pub fn load() -> Result<Config, envconfig::Error> {
    dotenv::dotenv().ok();
    Config::init_from_env()
}
