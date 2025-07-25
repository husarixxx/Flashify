from datetime import datetime, timedelta
from jose import jwt 


SECRET_KEY = "sadfklhjslkrhw5h32598sdnfjsd87583fjkh53jkhh53hakjh323hjkafsf98723lkjhsafjkl2"
ALGORITHM = "HS256"
ACCES_TOKEN_EXPIRE = 30

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now() + timedelta(minutes = ACCES_TOKEN_EXPIRE)
    to_encode.update({"exp" : expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


    return encoded_jwt