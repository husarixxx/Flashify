from fastapi import FastAPI,HTTPException,Depends
from fastapi.security import OAuth2PasswordRequestForm
import models,schemas, utils
from database import engine, Sessionlocal
from typing import Annotated
from sqlalchemy.orm  import Session
from login import create_access_token



# TODO : dzialajaca mechanika google i facebook (logowanie i rejestracja)
# TODO : zabrac sie za Ai (czesciowo zrobione)
# TODO : druga baza danych połaczona z Ai 
# TODO : Skonfigurowac porty (cross...)!!! wazne

app = FastAPI(
    title="Flashify API"
)

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
    existing_user = db.query(models.Users).filter(
        (models.Users.username == user.username) | 
        (models.Users.email == user.email)
        ).first()
    if existing_user :
        if existing_user.username == user.username :
            raise HTTPException(status_code=400, detail= "Username already taken")
        if existing_user.email == user.email:
            raise HTTPException(status_code=400 , detail="Email already registered")

    
    hashed_password = utils.hash_password(user.password)

    #tworzenie
    new_user = models.Users(username=user.username,
                            email = user.email,
                            hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login" ,response_model= schemas.Token)
async def login(db : db_deppendency, form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.Users).filter(
        (models.Users.username == form_data.username) 
    ).first()

    if not user or not utils.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password or username")
    
    access_token = create_access_token(data = {"sub" : user.username})
    return{"access_token" : access_token}





