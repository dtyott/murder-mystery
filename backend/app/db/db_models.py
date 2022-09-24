from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Game(Base):
    __tablename__ = "games"
    id = Column(String, primary_key=True, index=True)
    is_active = Column(Boolean, default=False)
    game_id = Column(String)

class Character(Base):
    __tablename__ = "characters"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String, index=True)
    backstory = Column(String, default="")
    money = Column(Integer, default=0)
    game_id = Column(String)

class Wager(Base):
    __tablename__ = "wagers"
    id = Column(String, primary_key=True, index=True)
    message = Column(String, default="")
    game_id = Column(String)
    char1_id = Column(String)
    char2_id = Column(String)
    amount = Column(Integer, default=0)
    accepted = Column(Boolean, nullable=True)
    char1_declare_win = Column(Boolean, nullable=True)
    char2_declare_win = Column(Boolean, nullable=True)
