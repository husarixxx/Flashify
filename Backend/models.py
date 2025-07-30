from database import Base
from sqlalchemy import Column,Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String, nullable=False)

    flashcards = relationship("Flashcard", back_populates="user", cascade="all, delete-orphan")

class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer,primary_key=True, index=True)
    question = Column(String, nullable=False)
    answer = Column(String,nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("Users", back_populates="flashcards")

