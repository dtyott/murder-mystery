from app.db.crud import get_games
import numpy as np

alphabet=[l for l in 'abcdefghijklmnopqrstuvwxyz']

def get_random_unused_game_id(db, length = 5):
    game_ids = [g.game_id for g in get_games(db)]
    res = "".join(np.random.choice(alphabet, size=length))
    return res if res not in game_ids else get_random_unused_game_id(length=length)