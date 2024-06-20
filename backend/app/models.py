from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: EmailStr
    password: str

class Job(BaseModel):
    job_name: str
    company_name: str
