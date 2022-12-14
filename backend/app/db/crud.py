from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import update

from app.db.resolvers import resolve_db_creates, resolve_db_updates

from . import db_models, utils
from loguru import logger
import json

form = lambda x: x[:1].upper() + x[1:-1]

def postprocess_create(db: Session, db_item):
    logger.info(f'creating {db_item}')
    db.add(db_item)
    db.commit()
    resolve_db_creates(db, db_item)
    db.refresh(db_item)
    return db_item

def postprocess_update(db:Session, model_name, query_params, db_update, q):
    logger.info(f'postprocessing {db_update} where {query_params}')
    updated_elements = get_db_elements_by_model(db, model_name, query_params)
    db.commit()
    resolve_db_updates(db, model_name, updated_elements, db_update)
    db.commit()
    return q.all()

def get_from_db_helper(path: str, constraint_dict: dict, db: Session, method = "time_created"):
    return get_db_elements_by_model(db, path.split("/")[-1], constraint_dict, method = method)

def create_db_element_helper(path: str, element, db: Session, background_tasks):
    element_dict = element.__dict__
    db_element = get_from_db_helper(path, element_dict, db)
    model_name = path.split("/")[-1]
    if db_element:
        raise HTTPException(status_code=400, detail=f'{model_name} already exists')
    return create_db_element_by_model(db, model_name, element_dict)

def update_db_element_helper(path: str, element, db: Session, background_tasks):
    element_dict = {k:v for k,v in element.__dict__.items() if v is not None}
    keys = ['game_id', 'id']
    query_params = {k:element_dict[k] for k in keys}
    db_element = get_from_db_helper(path, query_params, db)
    db_update = {k:element_dict[k] for k in element_dict if k not in keys}
    model_name = path.split("/")[-1]
    if not db_element:
        raise HTTPException(status_code=400, detail=f'{model_name} does not exist to update')
    return update_db_element_by_model(db, model_name, query_params, db_update)

def get_db_elements_by_model(db: Session, model_name:str, constraint_dict = {}, method = 'time_created'):
    model_cls = getattr(db_models, form(model_name))
    elements = db.query(model_cls)
    unordered = elements.filter_by(**constraint_dict).all()
    return sorted(unordered, key = lambda x: getattr(x, method))

def get_random_unused_id(db: Session, model_name:str):
    db_elements = get_db_elements_by_model(db, model_name)
    return utils.get_random_unused_id(db_elements)

def create_db_element_by_model(db: Session, model_name:str, db_element):
    model_cls = getattr(db_models, form(model_name))
    db_item = model_cls(**db_element)
    return postprocess_create(db, db_item)

def update_db_element_by_model(db: Session, model_name:str, query_params:dict, db_update:dict):
    model_cls = getattr(db_models, form(model_name))
    q = db.query(model_cls).filter_by(**query_params)
    logger.info(f'query is {q}')
    q.update(db_update,synchronize_session=False)
    return postprocess_update(db, model_name, query_params, db_update, q)