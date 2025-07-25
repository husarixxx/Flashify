from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base


DATABASE_URL = 'sqlite:///db/login.db'
engine  = create_engine(DATABASE_URL, connect_args={"check_same_thread" : False})

Sessionlocal  = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()