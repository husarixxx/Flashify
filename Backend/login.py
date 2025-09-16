import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status,Cookie
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session



import models
from database import Sessionlocal

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCES_TOKEN_EXPIRE = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()



def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCES_TOKEN_EXPIRE)
    to_encode.update({"exp": expire})


    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


    return encoded_jwt


def get_token_from_cookie(access_token: str | None = Cookie(default=None)):
    if access_token is None:
        return None
    
    parts = access_token.split()
    if len(parts) == 2 and  parts[0] == "Bearer":
        return parts[1]
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authorization format in cookie"
    )

def get_current_user(
        token : Annotated[str, Depends(get_token_from_cookie)],
          db : Session = Depends(get_db)
          ):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Cannot verify credentials",
    )

       

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Cannot verify credentials",
    )
    if token is None: 
        raise credentials_exception

    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        
    except JWTError:

        raise credentials_exception
    
    user = db.query(models.Users).filter(models.Users.username == username).first()

    if user is None :
        raise credentials_exception
    
    return user


def get_current_user_with_token_info(
    token: Annotated[str, Depends(get_token_from_cookie)],
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Cannot verify credentials",
    )
    
    if token is None:
        raise credentials_exception

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        username: str = payload.get("sub")
        exp_timestamp = payload.get("exp")
        
        if username is None:
            raise credentials_exception
            
        if exp_timestamp:
            exp_datetime = datetime.fromtimestamp(exp_timestamp)
            remaining_minutes = max(0, int((exp_datetime - datetime.now()).total_seconds() / 60))
        else:
            remaining_minutes = 0
        
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.Users).filter(models.Users.username == username).first()

    if user is None:
        raise credentials_exception
    
    return {"user": user, "expires_in_minutes": remaining_minutes}    