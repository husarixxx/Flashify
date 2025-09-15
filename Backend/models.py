from database import Base
from sqlalchemy import Column,Integer, String, ForeignKey,Boolean,Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String, nullable=False)

    #flashcards = relationship("Flashcard", back_populates="user", cascade="all, delete-orphan")
    #quiz_subjects = relationship("QuizSubject", back_populates="user", cascade="all, delete-orphan")
    subjects = relationship("Subject", back_populates="user",cascade="all, delete-orphan")


# głowny temat do tworzenia fiszek
class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Relacje
    user = relationship("Users", back_populates="subjects")
    flashcards = relationship("Flashcard", back_populates="subject",cascade="all, delete-orphan")
    quizzes = relationship("Quiz", back_populates="subject", cascade="all, delete-orphan")
    notes = relationship("Note", back_populates="subject", cascade="all, delete-orphan")



class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer,primary_key=True, index=True)
    question = Column(String, nullable=False)
    answer = Column(String,nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    subject_id = Column(Integer, ForeignKey("subjects.id"))

    #Relacje
    subject = relationship("Subject",back_populates="flashcards")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    subject_id = Column(Integer, ForeignKey('subjects.id'), nullable=False)

    subject = relationship("Subject", back_populates="quizzes")
    questions = relationship("QuizQuestion", back_populates="quiz",cascade="all, delete-orphan")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    type = Column(String, nullable=False)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'), nullable=False)

    #Relacje
    quiz = relationship("Quiz",back_populates="questions",)
    answers = relationship("QuizAnswer", back_populates="question", cascade="all, delete-orphan")


class QuizAnswer(Base):
    __tablename__ = "quiz_answers"

    id = Column(Integer, primary_key=True,index=True)
    text = Column(String, nullable=False)
    is_correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey('quiz_questions.id'), nullable=False)

    question = relationship("QuizQuestion", back_populates="answers")          


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True , index= True)
    title = Column(String,nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default = datetime.utcnow, onupdate=datetime.utcnow)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)

    #Relacje
    subject = relationship("Subject", back_populates="notes")
