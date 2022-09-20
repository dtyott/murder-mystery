from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect, Request, BackgroundTasks
from typing import Union 
from sqlalchemy.orm import Session
import uvicorn
import psycopg2
from loguru import logger
import json
import websockets


from app.nlp import story
from app.db.schemas import CharacterBase, PotentialCharacter
from app import config
from app.db import crud, schemas, db_models
from app.db.database import SessionLocal, engine
from app.db import utils as db_utils
from app.db.db_models import Game, Character
from app.sockets.websocketManager import ConnectionManager

db_models.Base.metadata.create_all(bind=engine)

app = FastAPI()
manager = ConnectionManager()



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def broadcast_path(path):
    msg = json.dumps({'path':path})
    logger.info(f'broadcasting {msg}')
    await manager.broadcast(msg)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/testing")
def read_root( request: Request):
    return {"url": str(request.url.path)}

@app.post("/api/potential_character", response_model=PotentialCharacter)
async def get_potential_character(input_character: CharacterBase, choices: int = 5):
    backstories = [story.make_story_for_character(input_character, config.STORY_LENGTH) for _ in range(choices)]
    return PotentialCharacter(**input_character.dict(), backstories=backstories)

@app.get("/api/random_game", response_model=schemas.Game)
async def get_random_game_id(request: Request, length: int = 5, db: Session = Depends(get_db)):
    return schemas.Game(game_id = db_utils.get_random_unused_game_id(db, length=length), is_active=False)

@app.get("/api/games", response_model=list[schemas.Game])
async def read_games(request: Request, db: Session = Depends(get_db)):
    games = crud.get_games(db)
    return games

@app.post("/api/games/create", response_model=schemas.Game)
async def create_game(game: schemas.GameCreate, request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_game = crud.get_game(db, game_id=game.game_id)
    if db_game:
        raise HTTPException(status_code=400, detail="Game already exists")
    background_tasks.add_task(broadcast_path, request.url.path)
    return crud.create_game(db=db, game_id=game.game_id)

@app.post("/api/characters", response_model=list[schemas.Character])
async def read_characters(game: schemas.GameCreate, request: Request, db: Session = Depends(get_db)):
    characters = crud.get_characters(db, game.game_id)
    return characters

@app.post("/api/characters/create", response_model=schemas.Character)
async def create_character(character: schemas.Character, request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_game = crud.get_game(db, game_id=character.game_id)
    if not db_game:
        raise HTTPException(status_code=400, detail="Game does not exist")
    db_char = crud.get_character(db, character)
    if db_char:
        raise HTTPException(status_code=400, detail="Character already exists")
    background_tasks.add_task(broadcast_path, request.url.path)
    return crud.create_character(db=db, character=character)

@app.post("/api/wagers", response_model=list[schemas.Wager])
async def read_wagers(game: schemas.GameCreate, request: Request, db: Session = Depends(get_db)):
    db_wagers = crud.get_wagers(db, game.game_id)
    return crud.wager_db_to_schema(db, db_wagers)

@app.post("/api/wagers/create", response_model=schemas.Wager)
async def create_wager(wager: schemas.Wager, request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_game = crud.get_game(db, game_id=wager.game_id)
    if not db_game:
        raise HTTPException(status_code=400, detail="Game does not exist")
    
    background_tasks.add_task(broadcast_path, request.url.path)
    crud.create_wager(db=db, wager=wager)
    return wager

@app.websocket("/websocket")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            logger.info(manager.active_connections)
            data = await websocket.receive_text()
            logger.info(data)
            await manager.send_personal_message(data, websocket)
            await manager.broadcast(data)
    except WebSocketDisconnect:
        await manager.disconnect(websocket)
        #await manager.broadcast(f"Someones left the chat")




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

