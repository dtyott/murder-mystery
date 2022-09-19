from typing import Union, List

from pydantic import BaseModel

class OurBaseModel(BaseModel):
    class Config:
        orm_mode = True

class CharacterBase(OurBaseModel):
    name: str
    role: str

class Character(CharacterBase):
    backstory: str
    game_id: str

class PotentialCharacter(CharacterBase):
    backstories: List[str]

class GameCreate(OurBaseModel):
    game_id: str

class Game(GameCreate):
    is_active: bool