from typing import Union, List, Optional

from pydantic import BaseModel

class OurBaseModel(BaseModel):
    id: str
    game_id: str
    class Config:
        orm_mode = True

class Game(OurBaseModel):
    is_active: bool = False

class Character(OurBaseModel):
    name: str
    backstory: Optional[str] = None
    money: int = 0

class Wager(OurBaseModel):
    message: str
    char1_id: str
    char2_id: str
    amount: int = 0
    accepted: Optional[bool] = None
    char1_declare_win: Optional[bool] = None
    char2_declare_win: Optional[bool] = None