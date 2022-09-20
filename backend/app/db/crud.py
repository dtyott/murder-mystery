from sqlalchemy.orm import Session

from . import db_models, schemas
from loguru import logger
from app.config import DEFAULT_MONEY

def postprocess_create(db: Session, db_item):
    logger.info(f'creating {db_item}')
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

####games

def get_game(db: Session, game_id: str):
    return db.query(db_models.Game).filter(db_models.Game.game_id == game_id).first()

def get_games(db: Session):
    return db.query(db_models.Game).all()

def create_game(db: Session, game_id: str):
    db_item = db_models.Game(game_id = game_id, is_active=False)
    return postprocess_create(db, db_item)

####characters

def get_character(db: Session, character: schemas.Character):
    return db.query(db_models.Character).filter(
        db_models.Character.game_id == character.game_id,
        db_models.Character.name == character.name,
        db_models.Character.role == character.role).first()

def get_characters(db: Session, game_id: str):

    return db.query(db_models.Character).filter(
        db_models.Character.game_id == game_id
    ).all()

def get_character_id(db: Session, game_id: str, character: schemas.CharacterBase):
    query = db.query(db_models.Character).filter(
        db_models.Character.game_id == game_id,
        db_models.Character.name == character.name,
        db_models.Character.role == character.role
    ).first()
    return query.id if query else None

def get_character_from_id(db: Session, id: int):
    query = db.query(db_models.Character).filter(
        db_models.Character.id == id
    ).first()
    return query

def create_character(db: Session, character: schemas.Character):
    db_item = db_models.Character(
        name = character.name,
        role = character.role,
        backstory = character.backstory,
        game_id = character.game_id,
        money = character.money or DEFAULT_MONEY)
    return postprocess_create(db, db_item)

def get_wagers(db: Session, game_id: str):

    return db.query(db_models.Wager).filter(
        db_models.Wager.game_id == game_id
    )

def wager_db_to_schema(db: Session, db_wagers):
    return [
        schemas.Wager(
        character1 = get_character_from_id(db, db_wager.player1_id),
        character2 = get_character_from_id(db, db_wager.player2_id),
        message= db_wager.message,
        game_id = db_wager.game_id,
        amount= db_wager.amount,
        accepted = db_wager.accept,
        active = db_wager.active) for db_wager in db_wagers]

def create_wager(db: Session, wager: schemas.Wager):

    db_item = db_models.Wager(
        game_id = wager.game_id,
        message = wager.message,
        player1_id = get_character_id(db, wager.game_id, wager.character1),
        player2_id = get_character_id(db, wager.game_id, wager.character2),
        amount = wager.amount,
        active = True)
    return postprocess_create(db, db_item) 