from fastapi import APIRouter, HTTPException, Depends
from pydantic import EmailStr
from app.db import user_collection
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.auth import get_password_hash, verify_password, create_access_token
from bson import ObjectId

router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate):
    user_exists = await user_collection.find_one({"email": user.email})
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_data = {"email": user.email, "password": hashed_password}
    await user_collection.insert_one(user_data)
    return {"message": "User created successfully"}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await user_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"token": access_token}
