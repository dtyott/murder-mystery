from typing import Union, List, Optional

from pydantic import BaseModel

from app.config import DEFAULT_MONEY

class OurBaseModel(BaseModel):
    id: str
    game_id: str
    class Config:
        orm_mode = True

class Game(OurBaseModel):
    is_active: bool = False

class GameUpdate(OurBaseModel):
    is_active: Optional[bool] = None

class Character(OurBaseModel):
    name: str
    backstory: Optional[str] = None
    money: int = DEFAULT_MONEY

class CharacterUpdate(OurBaseModel):
    name: Optional[str] = None
    backstory: Optional[str] = None
    money: Optional[int] = None

class Wager(OurBaseModel):
    message: str
    char1_id: str
    char2_id: str
    amount: int = 0
    accepted: Optional[bool] = None
    char1_declare_win: Optional[bool] = None
    char2_declare_win: Optional[bool] = None
    active: bool = True
    winner: Optional[str] = None

class WagerUpdate(OurBaseModel):
    message: Optional[str] = None
    char1_id: Optional[str] = None
    char2_id: Optional[str] = None
    amount: Optional[int] = None
    accepted: Optional[bool] = None
    char1_declare_win: Optional[bool] = None
    char2_declare_win: Optional[bool] = None
    active: Optional[bool] = None
    winner: Optional[str] = None