from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class Education(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    degree: str
    university: str
    faculty: str
    major: str
    gpa: str
    period: str
    location: str
    achievements: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class EducationUpdate(BaseModel):
    degree: Optional[str] = None
    university: Optional[str] = None
    faculty: Optional[str] = None
    major: Optional[str] = None
    gpa: Optional[str] = None
    period: Optional[str] = None
    location: Optional[str] = None
    achievements: Optional[List[str]] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)