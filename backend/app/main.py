from fastapi import FastAPI, Depends, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
import uvicorn
import psycopg2
from loguru import logger

from app.nlp import story
from app.db.schemas import Game, Character, Wager, Item, Store, STORE_DEFAULTS
from app import config
from app.db import crud, schemas, db_models
from app.db.database import SessionLocal, engine
from app.db.db_models import Game, Character

db_models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "https://murder-mystery-frontend.herokuapp.com"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}

###nlp

@app.post("/api/nlp/potential_character")
async def get_potential_character(character: schemas.Character, choices: int = 5):
    backstories = [story.make_story_for_character(character.name, config.STORY_LENGTH) for _ in range(choices)]
    return {"backstories": backstories}

##new ids

@app.get("/api/db/{model}/new_id")
async def get_new_id(model:str, db: Session = Depends(get_db)):
    return {"id":crud.get_random_unused_id(db, model)}

##get from db

@app.post("/api/db/games", response_model=list[schemas.Game])
async def get_elements(request: Request, game_id: str = None, db: Session = Depends(get_db)):
    constraint_dict = {'game_id': game_id} if game_id is not None else {}
    return crud.get_from_db_helper(request.url.path, constraint_dict, db)

@app.post("/api/db/characters", response_model=list[schemas.Character])
async def get_elements(request: Request, game_id: str = None, db: Session = Depends(get_db)):
    constraint_dict = {'game_id': game_id} if game_id is not None else {}
    return crud.get_from_db_helper(request.url.path, constraint_dict, db)

@app.post("/api/db/wagers", response_model=list[schemas.Wager])
async def get_elements(request: Request, game_id: str = None, db: Session = Depends(get_db)):
    constraint_dict = {'game_id': game_id} if game_id is not None else {}
    return crud.get_from_db_helper(request.url.path, constraint_dict, db)

@app.post("/api/db/items", response_model=list[schemas.Item])
async def get_elements(request: Request, game_id: str = None, db: Session = Depends(get_db)):
    constraint_dict = {'game_id': game_id} if game_id is not None else {}
    return crud.get_from_db_helper(request.url.path, constraint_dict, db)

@app.post("/api/db/stores", response_model=list[schemas.Store])
async def get_elements(request: Request, game_id: str = None, db: Session = Depends(get_db)):
    constraint_dict = {'game_id': game_id} if game_id is not None else {}
    return crud.get_from_db_helper(request.url.path, constraint_dict, db, "cost")


##create in db

@app.post("/api/db/create/games", response_model=schemas.Game)
async def create_element(request: Request, element: schemas.Game, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.create_db_element_helper(request.url.path, element, db,  background_tasks)

@app.post("/api/db/create/characters", response_model=schemas.Character)
async def create_element(request: Request, element: schemas.Character, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.create_db_element_helper(request.url.path, element, db,  background_tasks)

@app.post("/api/db/create/wagers", response_model=schemas.Wager)
async def create_element(request: Request, element: schemas.Wager, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.create_db_element_helper(request.url.path, element, db,  background_tasks)

@app.post("/api/db/create/items", response_model=schemas.Item)
async def create_element(request: Request, element: schemas.Item, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.create_db_element_helper(request.url.path, element, db,  background_tasks)

@app.post("/api/db/create/stores", response_model=schemas.Store)
async def create_element(request: Request, element: schemas.Store, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.create_db_element_helper(request.url.path, element, db,  background_tasks)

##update in db

@app.put("/api/db/update/games", response_model=list[schemas.Game])
async def update_element(request: Request, element: schemas.GameUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.update_db_element_helper(request.url.path, element, db,  background_tasks)

@app.put("/api/db/update/characters", response_model=list[schemas.Character])
async def update_element(request: Request, element: schemas.CharacterUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.update_db_element_helper(request.url.path, element, db,  background_tasks)

@app.put("/api/db/update/wagers", response_model=list[schemas.Wager])
async def update_element(request: Request, element: schemas.WagerUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.update_db_element_helper(request.url.path, element, db,  background_tasks)

@app.put("/api/db/update/items", response_model=list[schemas.Item])
async def update_element(request: Request, element: schemas.ItemUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.update_db_element_helper(request.url.path, element, db,  background_tasks)

@app.put("/api/db/update/stores", response_model=list[schemas.Store])
async def update_element(request: Request, element: schemas.StoreUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    return crud.update_db_element_helper(request.url.path, element, db,  background_tasks)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

