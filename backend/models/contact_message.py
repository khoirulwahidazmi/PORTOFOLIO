from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
from bson import ObjectId

class ContactMessage(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: str
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    subject: str
    message: str

class ContactMessageUpdate(BaseModel):
    is_read: Optional[bool] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)