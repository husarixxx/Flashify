from fastapi import FastAPI,HTTPException,Depends,Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import models,schemas, utils
from database import engine, Sessionlocal
from typing import Annotated, List
from sqlalchemy.orm  import Session
from login import create_access_token, get_current_user,get_current_user_with_token_info

from ai.gemini import generate_flashcards, generate_quizz



app = FastAPI(
    title="Flashify API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["GET", "POST","PUT","DELETE" ,"OPTIONS"],
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
        samesite='none',
        secure=True,
    )
    return {"status": "success", "message": "Logged in successfully"}

#wylogowanie
@app.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite='none',
        secure=True,
    )
    return {"status": "success", "message" : "Logged out successfully"}

#status pokazujacy pozostały czas
@app.get("/status", response_model=schemas.TokenStatusResponse)
async def get_token_status(
    token_info: dict = Depends(get_current_user_with_token_info)
):
    
    
    user = token_info["user"]
    expires_in_minutes = token_info["expires_in_minutes"]
    
    return schemas.TokenStatusResponse(
        username=user.username,
        email=user.email,
        expires_in_minutes=expires_in_minutes,
        is_authenticated=True
    )

# Subjects Endpoints

#zwraca wszystkie tematy dla danego usera
#zakladka flashcards
@app.get("/api/subjects/flashcards", response_model=List[schemas.SubjectResponse])
async def get_user_subjects_and_flascardCount(
    db : db_deppendency,
    current_user : models.Users = Depends(get_current_user)
):
    subjects = db.query(models.Subject).filter(
        models.Subject.user_id == current_user.id
    ).all()
    result = []
    for subject in subjects:
        subject_data = schemas.SubjectResponse.model_validate(subject)
        subject_data.stats = schemas.SubjectStats(
            flashcards_count=len(subject.flashcards)
        )
        result.append(subject_data)
    
    return result


#zwraca wszystkie tematy dla danego usera
#zakladka quizy
@app.get("/api/subjects/quizzes", response_model=List[schemas.SubjectResponse])
async def get_user_subjects_and_quizzCount(
    db : db_deppendency,
    current_user : models.Users = Depends(get_current_user)
):
    subjects = db.query(models.Subject).filter(
        models.Subject.user_id == current_user.id
    ).all()
    result = []
    for subject in subjects:
        subject_data = schemas.SubjectResponse.model_validate(subject)
        subject_data.stats = schemas.SubjectStats(
            quizzes_count=len(subject.quizzes)
        )
        result.append(subject_data)
    
    return result
#zwraca wszystkie tematy dla danego usera
#zakladka notes
@app.get("/api/subjects/notes", response_model=List[schemas.SubjectResponse])
async def get_user_subjects_and_NotesCount(
    db : db_deppendency,
    current_user : models.Users = Depends(get_current_user)
):
    subjects = db.query(models.Subject).filter(
        models.Subject.user_id == current_user.id
    ).all()
    result = []
    for subject in subjects:
        subject_data = schemas.SubjectResponse.model_validate(subject)
        subject_data.stats = schemas.SubjectStats(
            notes_count=len(subject.notes)
        )
        result.append(subject_data)
    
    return result

#zwraca wsystkie tematy z policzonymi itemmami typu quiz itp...
#zakladka subjects
@app.get("/api/subjects/count", response_model=List[schemas.SubjectResponse])
async def get_counted_user_items_by_subject(
    db : db_deppendency,
    current_user : models.Users = Depends(get_current_user)
):
    subjects = db.query(models.Subject).filter(
        models.Subject.user_id == current_user.id
    ).all()
    result = []
    for subject in subjects:
        subject_data = schemas.SubjectResponse.model_validate(subject)
        subject_data.stats = schemas.SubjectStats(
            flashcards_count=len(subject.flashcards),
            quizzes_count=len(subject.quizzes),
            notes_count=len(subject.notes)
        )
        result.append(subject_data)
    
    return result

#tworzenie subjectu ( tu akurat nie wazne jak czy quizz czy flash cy notes bo tworzt sie podobnie)
@app.post("/api/subjects", response_model=schemas.SubjectResponse)
async def create_subject(
    subject_data: schemas.SubjectCreate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    # sprawdzenie czy juz jest taki temat w bazie
    existing_subject = db.query(models.Subject).filter(
        models.Subject.user_id == current_user.id,
        models.Subject.name == subject_data.name
    ).first()
    
    if existing_subject:
        raise HTTPException(status_code=400, detail="Subject with this name already exists")
    
    new_subject = models.Subject(
        name=subject_data.name,
        user_id=current_user.id
    )
    
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)
    
    # zmiennne przy dodawaniu do liceznia
    result = schemas.SubjectResponse.model_validate(new_subject)
    result.stats = schemas.SubjectStats(
        flashcards_count=0,
        quizzes_count=0,
        notes_count=0
    )
    return result


# wszystkie fiszki do danego tematu 
@app.get("/api/subjects/{subject_id}/flashcards", response_model=List[schemas.FlashcardResponse])
async def get_flashcards(
    subject_id: int,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):

    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    return subject.flashcards


#  nowq fiszka do tematu
@app.post("/api/subjects/{subject_id}/flashcards", response_model=schemas.FlashcardResponse)
async def create_flashcard(
    subject_id: int,
    flashcard_data: schemas.FlashcardCreate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
   
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    new_flashcard = models.Flashcard(
        question=flashcard_data.question,
        answer=flashcard_data.answer,
        subject_id=subject_id
    )
    
    db.add(new_flashcard)
    db.commit()
    db.refresh(new_flashcard)
    return new_flashcard

# fiszki za  pomoca Ai
@app.post("/api/subjects/flashcards/generate", response_model=List[schemas.FlashcardResponse])
async def generate_flashcards_for_subject(
    subject_data: schemas.SubjectCreate,
    request_data: schemas.GenerateFlashcardsRequest,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    existing_subject = db.query(models.Subject).filter(
        models.Subject.user_id == current_user.id,
        models.Subject.name == subject_data.name
    ).first()
    
    if existing_subject:
        raise HTTPException(status_code=400, detail="Subject with this name already exists")
    
    new_subject = models.Subject(
        name=subject_data.name,
        user_id=current_user.id
    )
    
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)
    
    # zmiennne przy dodawaniu do liceznia
    result = schemas.SubjectResponse.model_validate(new_subject)
    result.stats = schemas.SubjectStats(
        flashcards_count=0,
        quizzes_count=0,
        notes_count=0
    )

    
    generated_flashcards = generate_flashcards(
        request_data.topic,
        request_data.number_of_flashcards
    )
    
    if not generated_flashcards:
        raise HTTPException(status_code=500, detail="Failed to generate flashcards")
    
    saved_flashcards = []
    for flashcard_data in generated_flashcards:
        new_flashcard = models.Flashcard(
            question=flashcard_data["question"],
            answer=flashcard_data["answer"],
            subject_id=new_subject.id
        )
        db.add(new_flashcard)
        saved_flashcards.append(new_flashcard)
    
    db.commit()
    
    for flashcard in saved_flashcards:
        db.refresh(flashcard)
    
    return saved_flashcards


#aktualizacja fiszki
@app.put("/api/subjects/{subject_id}/flashcards/{flashcard_id}", response_model=schemas.FlashcardResponse)
async def update_flashcard(
    subject_id: int,
    flashcard_id: int,
    flashcard_data: schemas.FlashcardUpdate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):

    flashcard = db.query(models.Flashcard).join(models.Subject).filter(
        models.Flashcard.id == flashcard_id,
        models.Flashcard.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    
    if flashcard_data.question is not None:
        flashcard.question = flashcard_data.question
    if flashcard_data.answer is not None:
        flashcard.answer = flashcard_data.answer
    
    db.commit()
    db.refresh(flashcard)
    return flashcard

# usuniecie fiszki
@app.delete("/api/subjects/{subject_id}/flashcards/{flashcard_id}")
async def delete_flashcard(
    subject_id: int,
    flashcard_id: int,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    flashcard = db.query(models.Flashcard).join(models.Subject).filter(
        models.Flashcard.id == flashcard_id,
        models.Flashcard.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    
    db.delete(flashcard)
    db.commit()
    return {"status": "success", "message": "Flashcard deleted successfully"}

# --QUIZZY--

#quizy z danego tematu
@app.get("/api/subjects/{subject_id}/quizzes", response_model=List[schemas.QuizResponse])
async def get_quizzes(
    subject_id: int,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    return subject.quizzes

# tworzenie nowego quizu bez AI
@app.post("/api/subjects/{subject_id}/quizzes", response_model=schemas.QuizResponse)
async def create_quiz_no_ai(
    subject_id: int,
    quiz_data: schemas.QuizCreate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    new_quiz = models.Quiz(
        title=quiz_data.title,
        subject_id=subject_id
    )
    
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)
    return new_quiz


# tworzenie nowego quizu z Ai
@app.post("/api/subjects/{subject_id}/quizzes/generate", response_model=schemas.QuizResponse)
async def create_quiz_with_ai_questions(
    subject_id: int,
    quiz_data: schemas.QuizCreate,
    request_data: schemas.GenerateQuizRequest,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    quiz =  models.Quiz(
        title=quiz_data.title,
        subject_id=subject_id
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    generated_questions = generate_quizz(
        request_data.topic,
        request_data.number_of_questions,
        request_data.question_types
    )
    
    if not generated_questions:
        raise HTTPException(status_code=500, detail="Failed to generate quiz questions")
    
    for question_data in generated_questions:
        new_question = models.QuizQuestion(
            question=question_data["question"],
            type=question_data["type"],
            quiz_id=quiz.id
        )
        db.add(new_question)
        db.flush()
        
        for answer_data in question_data["answers"]:
            new_answer = models.QuizAnswer(
                text=answer_data["text"],
                is_correct=answer_data["is_correct"],
                question_id=new_question.id
            )
            db.add(new_answer)
    
    db.commit()
    db.refresh(quiz)
    return quiz

#dodawanie pytania do quizu
@app.post("/api/subjects/{subject_id}/quizzes/{quiz_id}/questions")
async def add_question_to_quiz(
    subject_id: int,
    quiz_id: int,
    question_data: schemas.QuizQuestionCreate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    quiz = db.query(models.Quiz).join(models.Subject).filter(
        models.Quiz.id == quiz_id,
        models.Quiz.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    

    new_question = models.QuizQuestion(
        question=question_data.question,
        type=question_data.type,
        quiz_id=quiz_id
    )
    db.add(new_question)
    db.flush()
    
    
    for answer_data in question_data.answers:
        new_answer = models.QuizAnswer(
            text=answer_data.text,
            is_correct=answer_data.is_correct,
            question_id=new_question.id
        )
        db.add(new_answer)
    
    db.commit()
    return {"status": "success", "message": "Question added successfully", "question_id": new_question.id}

#edycja pytania
@app.put("/api/subjects/{subject_id}/quizzes/{quiz_id}/questions/{question_id}")
async def update_question_in_quiz(
    subject_id: int,
    quiz_id: int,
    question_id: int,
    question_data: schemas.QuizQuestionUpdate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    question = db.query(models.QuizQuestion).join(models.Quiz).join(models.Subject).filter(
        models.QuizQuestion.id == question_id,
        models.Quiz.id == quiz_id,
        models.Quiz.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    if question_data.question is not None:
        question.question = question_data.question
    if question_data.type is not None:
        question.type = question_data.type
    
    if question_data.answers is not None:
        
        db.query(models.QuizAnswer).filter(
            models.QuizAnswer.question_id == question_id
        ).delete()
        
        for answer_data in question_data.answers:
            new_answer = models.QuizAnswer(
                text=answer_data.text,
                is_correct=answer_data.is_correct,
                question_id=question_id
            )
            db.add(new_answer)
    
    db.commit()
    return {"status": "success", "message": "Question updated successfully"}

#usuwanie pytania w quizzie
@app.delete("/api/subjects/{subject_id}/quizzes/{quiz_id}/questions/{question_id}")
async def delete_question_from_quiz(
    subject_id: int,
    quiz_id: int,
    question_id: int,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    question = db.query(models.QuizQuestion).join(models.Quiz).join(models.Subject).filter(
        models.QuizQuestion.id == question_id,
        models.Quiz.id == quiz_id,
        models.Quiz.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    

    db.delete(question)
    db.commit()
    return {"status": "success", "message": "Question deleted successfully"}

# --NOTES --
# wszystkie notatki z danego tematu
@app.get("/api/subjects/{subject_id}/notes", response_model=List[schemas.NoteResponse])
async def get_notes(
    subject_id: int,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    return subject.notes

# nowa notatka do tematu
@app.post("/api/subjects/{subject_id}/notes", response_model=schemas.NoteResponse)
async def create_note(
    subject_id: int,
    note_data: schemas.NoteCreate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    new_note = models.Note(
        title=note_data.title,
        content=note_data.content,
        subject_id=subject_id
    )
    
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

# Aktualizacja notatki
@app.put("/api/subjects/{subject_id}/notes/{note_id}", response_model=schemas.NoteResponse)
async def update_note(
    subject_id: int,
    note_id: int,
    note_data: schemas.NoteUpdate,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    note = db.query(models.Note).join(models.Subject).filter(
        models.Note.id == note_id,
        models.Note.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    if note_data.title is not None:
        note.title = note_data.title
    if note_data.content is not None:
        note.content = note_data.content
    
    db.commit()
    db.refresh(note)
    return note


# Usuwanie notatki
@app.delete("/api/subjects/{subject_id}/notes/{note_id}")
async def delete_note(
    subject_id: int,
    note_id: int,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    note = db.query(models.Note).join(models.Subject).filter(
        models.Note.id == note_id,
        models.Note.subject_id == subject_id,
        models.Subject.user_id == current_user.id
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(note)
    db.commit()
    return {"status": "success", "message": "Note deleted successfully"}



#zmiana nazwy uzytkownika
@app.put("/api/user/username", response_model=schemas.UserResponse)
async def update_username(
    user_data: schemas.UserUpdateUsername,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    
    user = db.query(models.Users).filter(models.Users.id== current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not utils.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    existing_user = db.query(models.Users).filter(
        models.Users.username == user_data.new_username,
        models.Users.id != user.id
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    user.username = user_data.new_username
    db.commit()
    db.refresh(user)
    return {"status": "success", "message": "Username change successfully"}

#zmiana adresu email
@app.put("/api/user/email", response_model=schemas.UserResponse)
async def update_email(
    user_data: schemas.UserUpdateEmail,
    db: db_deppendency,
    
    current_user: models.Users = Depends(get_current_user)
    
):
    
    user = db.query(models.Users).filter(models.Users.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    if not utils.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    existing_user = db.query(models.Users).filter(
        models.Users.email == user_data.new_email,
        models.Users.id != user.id
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user.email = user_data.new_email
    db.commit()
    db.refresh(user)
    
    return {"status": "success", "message": "Email change successfully"}

#zmiana hasla
@app.put("/api/user/password", response_model=schemas.UserResponse)
async def update_password(
    user_data: schemas.UserUpdatePassword,
    db: db_deppendency,
    current_user: models.Users = Depends(get_current_user)
):
    user = db.query(models.Users).filter(models.Users.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not utils.verify_password(user_data.old_password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid old password")
    
    user.hashed_password = utils.hash_password(user_data.new_password)
    db.commit()
    db.refresh(user)
    
    return {"status": "success", "message": "Password change successfully"}
