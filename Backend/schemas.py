from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List, Literal


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
# -- topics of flaschards --

class SubjectBase(BaseModel):
    name: str

class SubjectCreate(SubjectBase):
    pass

class SubjectResponse(SubjectBase):
    id: int
    
    class Config:
        from_attributes = True





# --flashcards---

class BaseFlashcard(BaseModel):
    question: str
    answer: str

class CreateFlashcard(BaseFlashcard):
    subject_id: int 

class UpdateFlashcard(BaseFlashcard):
    pass

class ResponseFlashcard(BaseFlashcard):
    id: int
    user_id: int
    subject: Optional[SubjectResponse] = None 

    class Config:
        from_attributes = True

class GenerateRequest(BaseModel):
    subject: str  
    number_of_flashcards: int  = 5

# --- updates ---
class UserUpdate(BaseModel):
    username: str 
    email: str 
    password: str 



# --quizzes--
class QuizAnswerBase(BaseModel):
    text: str
    is_correct: bool

class QuizAnswerCreate(QuizAnswerBase):
    pass

class QuizAnswerUpdate(QuizAnswerBase):
    pass

class QuizAnswerResponse(QuizAnswerBase):
    id: int
    
    class Config:
        from_attributes = True


class QuizQuestionBase(BaseModel):
    question: str
    type: Literal["multiple-choice", "single-choice", "true-false"]

class QuizQuestionCreate(QuizQuestionBase):
    answers: List[QuizAnswerCreate]

class QuizQuestionUpdate(QuizQuestionBase):
    answers: List[QuizAnswerCreate]

class QuizQuestionResponse(QuizQuestionBase):
    id: int
    answers: List[QuizAnswerResponse]
    
    class Config:
        from_attributes = True

class QuizBase(BaseModel):
    title: str

class QuizCreate(BaseModel):
    name: str  

class QuizUpdate(QuizBase):
    pass

class QuizResponse(QuizBase):
    id: int
    questions: List[QuizQuestionResponse]
    
    class Config:
        from_attributes = True

class QuizSubjectBase(BaseModel):
    name: str

class QuizSubjectCreate(QuizSubjectBase):
    pass

class QuizSubjectResponse(QuizSubjectBase):
    id: int
    quizzes: List[QuizResponse]
    
    class Config:
        from_attributes = True

class GenerateQuizRequest(BaseModel):
    topic: str
    number_of_questions: int = 5
    question_types: List[Literal["multiple-choice", "single-choice", "true-false"]]