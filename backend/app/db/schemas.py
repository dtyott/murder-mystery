from typing import Union, List, Optional

from pydantic import BaseModel

from app.config import DEFAULT_MONEY
from app.config import DEFAULT_HP

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
    faction: Optional[str] = None
    backstory: Optional[str] = None
    money: int = DEFAULT_MONEY
    hp: int = DEFAULT_HP

class CharacterUpdate(OurBaseModel):
    name: Optional[str] = None
    faction: Optional[str] = None
    backstory: Optional[str] = None
    money: Optional[int] = None
    hp: Optional[int] = None

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

class ItemBase(OurBaseModel):
    item_name: str
    description: str

class Item(ItemBase):
    uses: int
    owner_id: Optional[str] = ""

class ItemUpdate(OurBaseModel):
    item_name: Optional[str] = None
    description: Optional[str] = None
    uses: Optional[int] = None
    cost: Optional[int] = None
    owner_id: Optional[str] = None

class Store(OurBaseModel):
    item_name: str
    description: str
    cost: int
    quantity: str
    uses: int

class StoreUpdate(OurBaseModel):
    item_name: Optional[str] = None
    description: Optional[str] = None
    cost: Optional[int] = None
    quantity: Optional[int] = None
    uses: Optional[int] = None

STORE_DEFAULTS = [
    {'item_name':'Pistol', 
    'description' : "A Small Concealed Weapon That Inflicts Minor Damage",
    'cost': 500,
    'quantity': 5,
    'uses': 5},
    {'item_name': 'Knife',
    'description': "A Small Knife Used To Intimidate",
    'cost': 250,
    'quantity':8,
    'uses': 3},
    {'item_name': 'Armor',
    'description': "Blocks Damage From 2 Attacks",
    'cost': 500,
    'quantity':8,
    'uses': 2},
    {'item_name': 'Truth Serum',
    'description': "Learn the identity or secret objective of one player",
    'cost': 1000,
    'quantity':4,
    'uses': 1}
]