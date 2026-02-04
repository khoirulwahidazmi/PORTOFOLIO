from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from dotenv import load_dotenv
from pathlib import Path
import logging

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample data based on mock.js
sample_data = {
    "personal_info": {
        "name": "Muhammad Khoirul Wahid Azmi",
        "title": "HR Professional & Legal Expert",
        "subtitle": "Specializing in Talent Acquisition, Industrial Relations & HR Operations",
        "profile_image": "https://customer-assets.emergentagent.com/job_b002c4ca-1035-4daa-a4df-fe16f26c60a7/artifacts/8aztvnji_Image_202602032300.jpeg",
        "location": "Gempol, Pasuruan, Jawa Timur",
        "email": "khoirulwahidazmi@gmail.com",
        "phone": "0851-9835-0070",
        "linkedin": "https://www.linkedin.com/in/wahidazmi",
        "cv_url": "https://customer-assets.emergentagent.com/job_b002c4ca-1035-4daa-a4df-fe16f26c60a7/artifacts/oi2d1uh7_Muhammad%20Khoirul%20Wahid%20Azmi.pdf",
        "summary": "Progressive HR professional with deep expertise in End-to-End Recruitment, Industrial Relations, and HR Operations. Achieved 98% MPP fulfillment rate and 100% payroll accuracy. Certified in BNSP HR Staff and CHRP with strong understanding of Indonesian Labor Law."
    },
    
    "experiences": [
        {
            "title": "HR Recruitment and Training",
            "company": "PT Buana Megah Paper Mills",
            "period": "December 2025 - Present",
            "location": "Indonesia",
            "achievements": [
                "Managed end-to-end recruitment for Staff to Managerial levels, achieving 98% MPP fulfillment",
                "Led New Hire Onboarding programs improving retention during probation period",
                "Designed training curricula based on TNA contributing to Zero Accident status",
                "Ensured 100% regulatory compliance in employment contracts (PKWT/PKWTT)",
                "Facilitated annual performance appraisal cycle aligning KPIs with business targets"
            ],
            "order": 1,
            "is_active": True
        },
        {
            "title": "Human Resources Operations Specialist",
            "company": "PT Indonesia Sarana Servis – KSO",
            "period": "September 2025 - December 2025",
            "location": "Indonesia",
            "achievements": [
                "Achieved 95% Fill Rate within SLA for recruitment processes",
                "Managed payroll and BPJS with 100% data accuracy for 86 employees",
                "Implemented structured KPI assessment system for objective bonus decisions",
                "Updated company regulations with 100% compliance to labor laws",
                "Acted as strategic partner resolving internal conflicts and disputes"
            ],
            "order": 2,
            "is_active": True
        },
        {
            "title": "HRD & GA",
            "company": "PT. Mahkota Sukses Makmur",
            "period": "March 2025 - September 2025",
            "location": "Indonesia",
            "achievements": [
                "Reduced time-to-fill by 30% through optimized recruitment processes",
                "Maintained over 98% stock accuracy through inventory control system",
                "Reduced operational downtime by 25% via preventive maintenance program",
                "Handled industrial relations and employee dispute mediation",
                "Prepared analytical HR & GA reports with process improvement recommendations"
            ],
            "order": 3,
            "is_active": True
        }
    ],
    
    "skills": [
        {
            "category": "professional",
            "subcategory": None,
            "skills": [
                "Talent Acquisition & Recruitment",
                "Compensation & Benefits Administration",
                "Industrial Relations & Labor Law Compliance",
                "Asset Management",
                "SOP Development & HR Policy Implementation"
            ]
        },
        {
            "category": "technical",
            "subcategory": None,
            "skills": [
                "Competency Assessment & Psychometric Evaluation",
                "Office Administration & Document Management",
                "Preventive Maintenance Planning",
                "Procurement & Vendor Management",
                "Report Writing & HR Analytics"
            ]
        },
        {
            "category": "technology",
            "subcategory": None,
            "skills": [
                "Microsoft Office Suite (Word, Excel, PowerPoint)",
                "Google Suite",
                "Adobe Creative Suite",
                "HR Information System (HRIS)",
                "Applicant Tracking System (ATS)",
                "Recruitment and Talent Management Software"
            ]
        }
    ],
    
    "education": {
        "degree": "Sarjana Hukum (Bachelor of Laws)",
        "university": "Universitas Islam Malang (UNISMA)",
        "faculty": "Fakultas Hukum",
        "major": "Hukum (Law)",
        "gpa": "3.75/4.00",
        "period": "September 2020 – February 2024",
        "location": "Malang, Jawa Timur",
        "achievements": [
            "Graduated Cum Laude with exceptional academic performance",
            "Researched thesis on law and digital technology development",
            "Active participation in student organizations developing communication skills"
        ]
    },
    
    "certifications": [
        {
            "title": "BNSP HR Staff MSDM",
            "issuer": "LSP MSDM UNGGUL INDONESIA",
            "date": "September 2025",
            "type": "Professional Certification",
            "order": 1
        },
        {
            "title": "Human Resources Professional (CHRP)",
            "issuer": "HR Academy Indonesia",
            "date": "December 2024",
            "type": "Professional Certification",
            "order": 2
        }
    ],
    
    "languages": [
        {"language": "Indonesian", "level": "Native"},
        {"language": "English", "level": "Proficient"},
        {"language": "Arabic", "level": "Proficient"}
    ]
}

async def seed_database():
    """Seed the database with sample data"""
    logging.info("Starting database seeding...")
    
    try:
        # Clear existing data
        collections = [
            'personal_info', 'experiences', 'skills', 'education', 
            'certifications', 'languages'
        ]
        
        for collection_name in collections:
            await db[collection_name].delete_many({})
            logging.info(f"Cleared {collection_name} collection")
        
        # Insert personal info
        await db.personal_info.insert_one(sample_data["personal_info"])
        logging.info("Inserted personal information")
        
        # Insert experiences
        await db.experiences.insert_many(sample_data["experiences"])
        logging.info(f"Inserted {len(sample_data['experiences'])} experiences")
        
        # Insert skills
        await db.skills.insert_many(sample_data["skills"])
        logging.info(f"Inserted {len(sample_data['skills'])} skill categories")
        
        # Insert education
        await db.education.insert_one(sample_data["education"])
        logging.info("Inserted education information")
        
        # Insert certifications
        await db.certifications.insert_many(sample_data["certifications"])
        logging.info(f"Inserted {len(sample_data['certifications'])} certifications")
        
        # Insert languages
        await db.languages.insert_many(sample_data["languages"])
        logging.info(f"Inserted {len(sample_data['languages'])} languages")
        
        logging.info("Database seeding completed successfully!")
        
    except Exception as e:
        logging.error(f"Error seeding database: {str(e)}")
        raise e
    finally:
        client.close()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(seed_database())