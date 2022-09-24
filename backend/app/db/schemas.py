from typing import Union, List, Optional

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
    money: int = None

class PotentialCharacter(CharacterBase):
    backstories: List[str]

class GameCreate(OurBaseModel):
    game_id: str

class Game(GameCreate):
    is_active: bool

class Wager(OurBaseModel):
    character1: CharacterBase
    character2: CharacterBase
    message: str
    game_id: str
    amount: int
    accepted: Optional[bool]
    active: Optional[bool]
    winner: Optional[str]