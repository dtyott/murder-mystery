from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql import func

from .database import Base

class Game(Base):
    __tablename__ = "games"
    id = Column(String, primary_key=True, index=True)
    is_active = Column(Boolean, default=False)
    game_id = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    characters = relationship("Character", back_populates="game")

class Character(Base):
    __tablename__ = "characters"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    backstory = Column(String, default="")
    money = Column(Integer, default=0)
    hp = Column(Integer)
    faction = Column(String, nullable=True)
    game_id = Column(String, ForeignKey("games.id"))
    game = relationship("Game", back_populates="characters")
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Wager(Base):
    __tablename__ = "wagers"
    id = Column(String, primary_key=True, index=True)
    message = Column(String, default="")
    game_id = Column(String)
    char1_id = Column(String, ForeignKey("characters.id"))
    char2_id = Column(String, ForeignKey("characters.id"))
    amount = Column(Integer, default=0)
    accepted = Column(Boolean, nullable=True)
    char1_declare_win = Column(Boolean, nullable=True)
    char2_declare_win = Column(Boolean, nullable=True)
    active = Column(Boolean, default = True)
    winner = Column(String, nullable=True)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    char1 = relationship("Character", foreign_keys = [char1_id])
    char2 = relationship("Character", foreign_keys = [char2_id])

class Item(Base):
    id = Column(String, primary_key=True, index=True)
    game_id = Column(String)
    __tablename__ = "items"
    item_name = Column(String)
    description = Column(String)
    uses = Column(Integer, default=0)
    owner_id = Column(String, ForeignKey("characters.id"))
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Store(Base):
    id = Column(String, primary_key=True, index=True)
    game_id = Column(String)
    __tablename__ = "stores"
    item_name = Column(String)
    description = Column(String)
    cost = Column(Integer)
    quantity = Column(Integer)
    uses = Column(Integer)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())