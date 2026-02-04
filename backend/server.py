from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

# Import models
from models.personal_info import PersonalInfo, PersonalInfoUpdate
from models.experience import Experience, ExperienceCreate, ExperienceUpdate
from models.skills import Skills, SkillsCreate, SkillsUpdate
from models.education import Education, EducationUpdate
from models.certification import Certification, CertificationCreate, CertificationUpdate
from models.organization_experience import OrganizationExperience, OrganizationExperienceCreate, OrganizationExperienceUpdate
from models.language import Language, LanguageCreate, LanguageUpdate
from models.contact_message import ContactMessage, ContactMessageCreate, ContactMessageUpdate

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utility function to convert MongoDB document to dict
def convert_objectid_to_str(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# Personal Information endpoints
@api_router.get("/personal", response_model=PersonalInfo)
async def get_personal_info():
    """Get personal information"""
    try:
        personal_info = await db.personal_info.find_one()
        if not personal_info:
            raise HTTPException(status_code=404, detail="Personal information not found")
        return convert_objectid_to_str(personal_info)
    except Exception as e:
        logging.error(f"Error fetching personal info: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Experience endpoints
@api_router.get("/experiences", response_model=List[Experience])
async def get_experiences():
    """Get all work experiences sorted by order"""
    try:
        experiences = await db.experiences.find(
            {"is_active": True}
        ).sort("order", 1).to_list(1000)
        
        return [convert_objectid_to_str(exp) for exp in experiences]
    except Exception as e:
        logging.error(f"Error fetching experiences: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Skills endpoints
@api_router.get("/skills")
async def get_skills():
    """Get all skills grouped by category"""
    try:
        skills = await db.skills.find().to_list(1000)
        
        # Group skills by category
        grouped_skills = {
            "professional": [],
            "technical": [],
            "technology": [],
            "soft": {
                "social": [],
                "process": [],
                "generic": []
            }
        }
        
        for skill_doc in skills:
            category = skill_doc["category"]
            skills_list = skill_doc["skills"]
            
            if category == "soft":
                subcategory = skill_doc.get("subcategory", "generic")
                grouped_skills["soft"][subcategory] = skills_list
            else:
                grouped_skills[category] = skills_list
        
        return grouped_skills
    except Exception as e:
        logging.error(f"Error fetching skills: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Education endpoint
@api_router.get("/education", response_model=Education)
async def get_education():
    """Get education information"""
    try:
        education = await db.education.find_one()
        if not education:
            raise HTTPException(status_code=404, detail="Education information not found")
        return convert_objectid_to_str(education)
    except Exception as e:
        logging.error(f"Error fetching education: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Certifications endpoints
@api_router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    """Get all certifications sorted by order"""
    try:
        certifications = await db.certifications.find().sort("order", 1).to_list(1000)
        return [convert_objectid_to_str(cert) for cert in certifications]
    except Exception as e:
        logging.error(f"Error fetching certifications: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Languages endpoints
@api_router.get("/languages", response_model=List[Language])
async def get_languages():
    """Get all languages"""
    try:
        languages = await db.languages.find().to_list(1000)
        return [convert_objectid_to_str(lang) for lang in languages]
    except Exception as e:
        logging.error(f"Error fetching languages: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact: ContactMessageCreate):
    """Submit contact form"""
    try:
        contact_data = contact.dict()
        contact_data["created_at"] = datetime.utcnow()
        contact_data["updated_at"] = datetime.utcnow()
        contact_data["is_read"] = False
        
        result = await db.contact_messages.insert_one(contact_data)
        created_message = await db.contact_messages.find_one({"_id": result.inserted_id})
        
        return convert_objectid_to_str(created_message)
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()