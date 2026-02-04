from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class Experience(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    title: str
    company: str
    period: str
    location: str
    achievements: List[str]
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ExperienceCreate(BaseModel):
    title: str
    company: str
    period: str
    location: str
    achievements: List[str]
    order: Optional[int] = 0
    is_active: Optional[bool] = True

class ExperienceUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    period: Optional[str] = None
    location: Optional[str] = None
    achievements: Optional[List[str]] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)