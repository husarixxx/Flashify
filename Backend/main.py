
from pydantic import BaseModel, Field
from fastapi import FastAPI,HTTPException,Depends
import models,schemas, utils
from database import engine, Sessionlocal
from typing import Annotated
from sqlalchemy.orm  import Session



# TODO : dzialajaca mechanika kont


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()


db_deppendency = Annotated[Session, Depends(get_db)]

@app.post("/register",response_model= schemas.UserResponse)
async def register(user : schemas.UserCreate, db : db_deppendency):
    #test czy istnieje gość w bazie
    existing_user = db.query(models.Users).filter(models.Users.username == user.username).first()
    if existing_user :
        raise HTTPException(status_code=400, detail= "User  already registered")
    
    #hash
    hashed_password = utils.hash_password(user.password)

    #tworzenie
    new_user = models.Users(username=user.username,hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh()
    return new_user





