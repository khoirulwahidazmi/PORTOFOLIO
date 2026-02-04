from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Language(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    language: str
    level: str  # 'Native', 'Proficient', 'Basic'
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class LanguageCreate(BaseModel):
    language: str
    level: str

class LanguageUpdate(BaseModel):
    language: Optional[str] = None
    level: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)