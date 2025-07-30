from fastapi import FastAPI,HTTPException,Depends,Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import models,schemas, utils
from database import engine, Sessionlocal
from typing import Annotated
from sqlalchemy.orm  import Session
from login import create_access_token, get_current_user

from ai.gemini import generate_flashcards



# TODO : Working Google and Facebook mechanics (Login and Register)
# TODO : take care of Ai (for scientific purposes ), and image processing
# TODO : second table  add column with specific topic (propably the same as the topic)

app = FastAPI(
    title="Flashify API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
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

@app.post("/login")
async def login(response : Response, db: db_deppendency, login_data: schemas.UserLogin):

    user = db.query(models.Users).filter(
        (models.Users.username == login_data.username) 
    ).first()

    if not user or not utils.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password or username")
    
    access_token = create_access_token(data={"sub": user.username})


    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        samesite='lax',
        secure=True,
    )
    return {"status": "success", "message": "Logged in successfully"}


@app.post("/Flashcards/Generate", response_model=list[schemas.CreateFlashcard])
async def createFlash(db : db_deppendency,
                    request_data : schemas.GenerateRequest,
                    current_user: models.Users = Depends(get_current_user)
                       ):
    Created_flashcards = generate_flashcards(
        request_data.topic,
        request_data.number_of_flashcards
    )
    saved_flashcards = []
    if not Created_flashcards:
        raise HTTPException(
            status_code=500,
            detail= "Failed to generate Flashcards"
        )
    for flashcard in Created_flashcards:
        db_flashcard = models.Flashcard(
            question = flashcard["question"],
            answer = flashcard["answer"],
            user_id = current_user.id 
        )
        db.add(db_flashcard)
        saved_flashcards.append(db_flashcard)

    db.commit()


    for flashcard in saved_flashcards:
        db.refresh(flashcard)


    return saved_flashcards

