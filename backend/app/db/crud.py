from sqlalchemy.orm import Session

from . import db_models, schemas


def postprocess_create(db: Session, db_item):
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

def create_character(db: Session, character: schemas.Character):
    db_item = db_models.Character(
        name = character.name,
        role = character.role,
        backstory = character.backstory,
        game_id = character.game_id)
    return postprocess_create(db, db_item)