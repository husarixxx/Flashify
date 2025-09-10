from fastapi import FastAPI,HTTPException,Depends,Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import models,schemas, utils
from database import engine, Sessionlocal
from typing import Annotated
from sqlalchemy.orm  import Session
from login import create_access_token, get_current_user

from ai.gemini import generate_flashcards



app = FastAPI(
    title="Flashify API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["GET", "POST","PUT","DELETE" "OPTIONS"],
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


@app.post("/Flashcards/Generate", response_model=list[schemas.ResponseFlashcard ])#schemas.CreateFlashcard
async def createFlash(db : db_deppendency,
                    request_data : schemas.GenerateRequest,
                    current_user: models.Users = Depends(get_current_user)
                       ):
    subject = db.query(models.Subject).filter(
        models.Subject.name == request_data.subject
    ).first()

    if not subject:
        subject = models.Subject(name=request_data.subject)
        db.add(subject)
        db.commit()
        db.refresh(subject)

    Created_flashcards = generate_flashcards(
        request_data.subject,
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
            user_id = current_user.id,
            subject_id = subject.id 
        )
        db.add(db_flashcard)
        saved_flashcards.append(db_flashcard)

    db.commit()


    for flashcard in saved_flashcards:
        db.refresh(flashcard)


    return saved_flashcards

# ----------------------Flashcards methods for specific User---------------------------#
# @app.get("/flashcards", response_model=list[schemas.CreateFlashcard])
# async def get_flashcards(db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
#     flashcards = db.query(models.Flashcard).filter(models.Flashcard.user_id == current_user.id).all()
#     return flashcards


# @app.put("/flashcards/{flashcard_id}", response_model=schemas.CreateFlashcard)
# async def update_flashcard(flashcard_id: int, update: schemas.UpdateFlashcard, 
#                            db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
#     flashcard = db.query(models.Flashcard).filter(
#         models.Flashcard.id == flashcard_id,
#         models.Flashcard.user_id == current_user.id
#     ).first()
#     if not flashcard:
#         raise HTTPException(status_code=404, detail="Flashcard not found")

#     if update.question:
#         flashcard.question = update.question
#     if update.answer:
#         flashcard.answer = update.answer

#     db.commit()
#     db.refresh(flashcard)
#     return flashcard

# @app.delete("/flashcards/{flashcard_id}")
# async def delete_flashcard(flashcard_id: int, db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
#     flashcard = db.query(models.Flashcard).filter(
#         models.Flashcard.id == flashcard_id,
#         models.Flashcard.user_id == current_user.id
#     ).first()
#     if not flashcard:
#         raise HTTPException(status_code=404, detail="Flashcard not found")

#     db.delete(flashcard)
#     db.commit()
#     return {"status": "success", "message": "Flashcard deleted"}


# --- subject methods---

@app.get("/subjects")
async def get_subjects(db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
    subjects = db.query(models.Subject).all()
    response = [
        {
            "id" : s.id,
            "name" : s.name,
            "flaschcardsCount" : len(s.flashcards)

        } for s in subjects
    ]
    return response


@app.get("/subjects/{subject_id}/flashcards")
async def get_flashcards_by_subject(subject_id: int, db: db_deppendency,
                                     current_user: models.Users = Depends(get_current_user)):
    flashcards = db.query(models.Flashcard).filter(
        models.Flashcard.subject_id == subject_id,
        models.Flashcard.user_id == current_user.id
    ).all()
    return flashcards


@app.post("/subjects/{subject_id}/flashcards", response_model=schemas.ResponseFlashcard)
async def add_flashcards(subject_id: int, flashcard: schemas.CreateFlashcard,
                         db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
    db_flashcards = models.Flashcard(
        question = flashcard.question,
        answer = flashcard.answer,
        user_id = current_user.id,
        subject_id = subject_id
    )
    db.add(db_flashcards)
    db.commit()
    db.refresh(db_flashcards)
    return db_flashcards


@app.put("/subjects/{subject_id}/flashcards/{flashcard_id}", response_model=schemas.ResponseFlashcard)
async def update_flashcards(subject_id : int,flashcard_id: int, flashcard: schemas.CreateFlashcard,
                            db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
    
    db_flashcard = db.query(models.Flashcard).filter(
        models.Flashcard.id == flashcard_id,
        models.Flashcard.subject_id == subject_id,
        models.Flashcard.user_id == current_user.id
    ).first()
    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    db_flashcard.question = flashcard.question
    db_flashcard.answer = flashcard.answer
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard


@app.delete("/subjects/{subject_id}/flashcards/{flashcard_id}")
async def delete_flashcard(subject_id: int , flashcard_id: int,
                           db: db_deppendency, current_user: models.Users = Depends(get_current_user)):
    db_flashcard = db.query(models.Flashcard).filter(
        models.Flashcard == flashcard_id,
        models.Flashcard.subject_id == subject_id,
        models.Flashcard.user_id == current_user.id
    ).first()

    if not db_flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    db.delete(db_flashcard)
    db.commit()
    return {"status": "success", "message": "Flashcard deleted"}