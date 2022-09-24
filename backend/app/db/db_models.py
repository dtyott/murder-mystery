from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Game(Base):
    __tablename__ = "games"
    #id = Column(Integer, primary_key=True, index=True)
    game_id = Column(String, primary_key=True, index=True)
    is_active = Column(Boolean, default=False)
    users = relationship("Character")

class Character(Base):
    __tablename__ = "characters"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String, index=True)
    backstory = Column(String)
    game_id = Column(String, ForeignKey("games.game_id"))
    money = Column(Integer)

class Wager(Base):
    __tablename__ = "wagers"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    game_id = Column(String)
    player1_id = Column(Integer)
    player2_id = Column(Integer)
    amount = Column(Integer)
    active = Column(Boolean)
    accept = Column(Boolean, nullable=True)
    player1_winner = Column(Boolean, nullable=True)
    player2_winner = Column(Boolean, nullable=True)
