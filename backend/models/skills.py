from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class Skills(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    category: str  # 'professional', 'technical', 'technology', 'soft'
    subcategory: Optional[str] = None  # for soft skills: 'social', 'process', 'generic'
    skills: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class SkillsCreate(BaseModel):
    category: str
    subcategory: Optional[str] = None
    skills: List[str]

class SkillsUpdate(BaseModel):
    category: Optional[str] = None
    subcategory: Optional[str] = None
    skills: Optional[List[str]] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)