from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: EmailStr

    class Config:
        orm_mode = True
