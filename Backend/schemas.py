from pydantic import BaseModel, EmailStr, Field, field_validator



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


class BaseFlashcard(BaseModel):
    question : str
    answer : str

class CreateFlashcard(BaseFlashcard):
    pass 

class ResponseFlashcard(BaseFlashcard):
    id : int
    user_id : int

    class Config:
        from_attributes = True

class GenerateRequest(BaseModel):
    topic : str
    number_of_flashcards: int = 5


class UserUpdate(BaseModel):
    username: str 
    email: str 
    password: str 


class UpdateFlashcard(BaseModel):
    question: str 
    answer: str
