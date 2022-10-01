from sqlalchemy.orm import Session
from app.db import db_models
from loguru import logger
form = lambda x: x[:1].upper() + x[1:-1]



def resolve_db_updates(db: Session, model_name:str, updated_elements, db_update:dict):
    logger.info(f'resolving update for {updated_elements}, {updated_elements} were updated')
    for element in updated_elements:
        logger.info(f'model_name is {model_name}')
        if form(model_name)=='Wager':
            char1_win = element.char1_declare_win
            char2_win = element.char2_declare_win
            winner = element.winner

            if (char1_win is not None) and (char2_win is not None) and (winner is None):
                declare_winner = element.char1_id if (char1_win and not char2_win) else element.char2_id if (char2_win and not char1_win) else None
                declare_loser = element.char1_id if (declare_winner == element.char2_id) else element.char2_id if (declare_winner==element.char1_id) else None

                logger.info(f'element dict is {element.__dict__}')
                logger.info(f'db_update is {db_update}')
                logger.info(f'char1 wins? {char1_win}, char1_id: {element.char1_id}')
                logger.info(f'char2 wins? {char2_win}, char1_id: {element.char2_id}')
                logger.info(f'winner is {declare_winner}')
                logger.info(f'loser is {declare_loser}')

                if declare_winner is not None:
                    db.query(db_models.Character).filter(db_models.Character.id == declare_winner).update(
                        {"money": db_models.Character.money + element.amount}, synchronize_session="fetch"
                        )
                if declare_loser is not None:
                    db.query(db_models.Character).filter(db_models.Character.id == declare_loser).update(
                        {"money": db_models.Character.money - element.amount}, synchronize_session="fetch"
                        )

                db.query(db_models.Wager).filter(db_models.Wager.id==element.id).update(
                    {'winner': declare_winner, 'active': False}, synchronize_session='fetch'
                )





