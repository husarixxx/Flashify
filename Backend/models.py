from database import Base
from sqlalchemy import Column,Integer, String, ForeignKey,Boolean
from sqlalchemy.orm import relationship


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, unique=True)
    hashed_password = Column(String, nullable=False)

    flashcards = relationship("Flashcard", back_populates="user", cascade="all, delete-orphan")
    quiz_subjects = relationship("QuizSubject", back_populates="user", cascade="all, delete-orphan")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

    flashcards = relationship("Flashcard", back_populates="subject")



class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer,primary_key=True, index=True)
    question = Column(String, nullable=False)
    answer = Column(String,nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"))

    user = relationship("Users", back_populates="flashcards")
    subject = relationship("Subject",back_populates="flashcards")



class QuizSubject(Base):
    __tablename__ = "quiz_subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    user = relationship("Users", back_populates="quiz_subjects")
    quizzes = relationship("Quiz",back_populates="subject", cascade="all, delete-orphan")

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subject_id = Column(Integer, ForeignKey('quiz_subjects.id'), nullable=False)

    subject = relationship("QuizSubject", back_populates="quizzes")
    questions = relationship("QuizQuestion", back_populates="quiz",cascade="all, delete-orphan")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    type = Column(String, nullable=False)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'), nullable=False)


    quiz = relationship("Quiz",back_populates="questions",)
    answers = relationship("QuizAnswer", back_populates="question", cascade="all, delete-orphan")


class QuizAnswer(Base):
    __tablename__ = "quiz_answers"

    id = Column(Integer, primary_key=True,index=True)
    text = Column(String, nullable=False)
    is_correct = Column(Boolean, default=False)
    question_id = Column(Integer, ForeignKey('quiz_questions.id'), nullable=False)

    question = relationship("QuizQuestion", back_populates="answers")          
