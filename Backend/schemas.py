from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List, Literal
from datetime import datetime


# -- User mechanics --

class UserCreate(BaseModel):
    username: str = Field(..., min_length= 5 , max_length= 20)
    email  : EmailStr
    password: str = Field(..., min_length=8)

    @field_validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(char.isdigit() for char in v):
            raise ValueError("Password must have at least one number")
        if not any(char.isupper() for char in v):
            raise ValueError("Password must have at least one UpperCase letter")
        return v
        
    @field_validator('username')
    def validate_username(cls, v):
        if len(v) < 8 :
            raise ValueError("Username must be at least 8 characters")
        return v

class UserLogin(BaseModel):
    username : str
    password : str


class UserResponse(BaseModel):
    id: int
    username: str
    email : EmailStr

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token : str

class UserUpdateUsername(BaseModel):
    
    password: str
    new_username: str = Field(..., min_length=5, max_length=20)
    
    @field_validator('new_username')
    def validate_username(cls, v):
        if len(v) < 8:
            raise ValueError("Username must be at least 8 characters")
        return v


class UserUpdateEmail(BaseModel):
    email: EmailStr  # Current email
    password: str
    new_email: EmailStr


class UserUpdatePassword(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str = Field(..., min_length=8)
    
    @field_validator('new_password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(char.isdigit() for char in v):
            raise ValueError("Password must have at least one number")
        if not any(char.isupper() for char in v):
            raise ValueError("Password must have at least one UpperCase letter")
        return v

# -- topics of flaschards --

#Głowny subject

class SubjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)

class SubjectUpdate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)

class SubjectStats(BaseModel):
    flashcards_count: int = 0
    quizzes_count: int = 0 
    notes_count: int = 0

class SubjectResponse(BaseModel):
    id: int
    name: str
    created_at: datetime
    stats: Optional[SubjectStats] = None

    class Config:
        from_attributes = True




# --flashcards---

class FlashcardCreate(BaseModel):
    question: str = Field(..., min_length=1)
    answer: str = Field(..., min_length=1)

class FlashcardUpdate(BaseModel):
    
    question: Optional[str] = Field(None, min_length=1)
    answer: Optional[str] = Field(None, min_length=1)


class FlashcardResponse(BaseModel):
    id: int
    question: str
    answer: str
    created_at: datetime
    subject_id: int

    class Config:
        from_attributes = True

class GenerateFlashcardsRequest(BaseModel):
    topic: str = Field(..., min_length=1)
    number_of_flashcards: int = Field(default=5, ge=1, le=30)

# --- updates ---
class UserUpdate(BaseModel):
    username: str 
    email: str 
    password: str 



# --quizzes--
class QuizAnswerCreate(BaseModel):
    text: str
    is_correct: bool

class QuizAnswerResponse(BaseModel):
    id: int
    text: str
    is_correct: bool

    class Config:
        from_attributes = True


class QuizQuestionCreate(BaseModel):
    question: str = Field(..., min_length=1)
    type: Literal["multiple-choice", "single-choice", "true-false"]
    answers: List[QuizAnswerCreate] = Field(..., min_items=2)

class QuizQuestionUpdate(BaseModel):
    question: Optional[str] = Field(None, min_length=1)
    type: Optional[Literal["multiple-choice", "single-choice", "true-false"]] = None
    answers: Optional[List[QuizAnswerCreate]] = Field(None, min_items=2)


class QuizQuestionResponse(BaseModel):
    id: int
    question: str
    type: str
    answers: List[QuizAnswerResponse]

    class Config:
        from_attributes = True

class QuizCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    

class QuizUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)


class QuizResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    subject_id: int
    questions: List[QuizQuestionResponse] = []

    class Config:
        from_attributes = True

class GenerateQuizRequest(BaseModel):
    topic: str = Field(..., min_length=1)
    number_of_questions: int = Field(default=5, ge=1, le=30)
    question_types: List[Literal["multiple-choice", "single-choice", "true-false"]]


# Notes

class NoteCreate(BaseModel):
    title: str = Field(..., min_length=1 , max_length=30)
    content: str

class NoteUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=30)
    content: Optional[str]

class NoteResponse(BaseModel):
    id : int 
    title : str
    content : str
    created_at : datetime
    updated_at : datetime
    subject_id : int 

    class Config:
        from_attibutes = True
