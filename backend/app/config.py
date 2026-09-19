import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Darukaa.Earth Geospatial API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./darukaa.db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "darukaa-super-secret-jwt-key-change-in-production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 Hours

settings = Settings()
