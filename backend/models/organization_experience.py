from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class OrganizationExperience(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    title: str
    organization: str
    period: str
    achievements: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class OrganizationExperienceCreate(BaseModel):
    title: str
    organization: str
    period: str
    achievements: List[str]

class OrganizationExperienceUpdate(BaseModel):
    title: Optional[str] = None
    organization: Optional[str] = None
    period: Optional[str] = None
    achievements: Optional[List[str]] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)