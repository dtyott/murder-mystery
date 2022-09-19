import os
from dotenv import load_dotenv
load_dotenv()

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    db_url: str = Field(..., env='DATABASE_URL')

settings = Settings(os.environ['DATABASE_URL'])