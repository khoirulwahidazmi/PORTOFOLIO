#!/usr/bin/env python3
"""
Portfolio Backend API Test Suite
Tests all portfolio API endpoints for functionality and data integrity.
"""

import requests
import json
import sys
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="https://personal-portfolio-65.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }
    
    def log_result(self, test_name, passed, error_msg=None):
        """Log test result"""
        if passed:
            self.results["passed"] += 1
            print(f"✅ {test_name}: PASSED")
        else:
            self.results["failed"] += 1
            print(f"❌ {test_name}: FAILED - {error_msg}")
            self.results["errors"].append(f"{test_name}: {error_msg}")
    
    def test_personal_info_api(self):
        """Test GET /api/personal endpoint"""
        try:
            response = requests.get(f"{self.api_url}/personal", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required fields
                required_fields = ['name', 'title', 'email', 'phone', 'location', 'summary']
                missing_fields = [field for field in required_fields if field not in data or not data[field]]
                
                if missing_fields:
                    self.log_result("Personal Info API - Data Validation", False, f"Missing required fields: {missing_fields}")
                else:
                    # Check if it's Muhammad Khoirul Wahid Azmi's data
                    if "Muhammad Khoirul Wahid Azmi" in data.get('name', ''):
                        self.log_result("Personal Info API - Correct Person", True)
                    else:
                        self.log_result("Personal Info API - Correct Person", False, f"Expected Muhammad Khoirul Wahid Azmi, got: {data.get('name', 'No name')}")
                    
                    self.log_result("Personal Info API - Response", True)
                    
                    # Print sample data for verification
                    print(f"   📋 Name: {data.get('name', 'N/A')}")
                    print(f"   📋 Title: {data.get('title', 'N/A')}")
                    print(f"   📧 Email: {data.get('email', 'N/A')}")
                    
            else:
                self.log_result("Personal Info API - Response", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Personal Info API - Connection", False, f"Error: {str(e)}")
    
    def test_experiences_api(self):
        """Test GET /api/experiences endpoint"""
        try:
            response = requests.get(f"{self.api_url}/experiences", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_result("Experiences API - Response Format", True)
                    
                    if len(data) > 0:
                        # Check structure of first experience
                        exp = data[0]
                        required_fields = ['title', 'company', 'period', 'achievements']
                        missing_fields = [field for field in required_fields if field not in exp]
                        
                        if missing_fields:
                            self.log_result("Experiences API - Data Structure", False, f"Missing fields: {missing_fields}")
                        else:
                            self.log_result("Experiences API - Data Structure", True)
                        
                        # Check if sorted by order (if order field exists)
                        if len(data) > 1 and all('order' in exp for exp in data):
                            orders = [exp['order'] for exp in data]
                            if orders == sorted(orders):
                                self.log_result("Experiences API - Sorting", True)
                            else:
                                self.log_result("Experiences API - Sorting", False, f"Not sorted by order: {orders}")
                        else:
                            self.log_result("Experiences API - Sorting", True, "Single item or no order field")
                        
                        print(f"   📋 Found {len(data)} experiences")
                        print(f"   🏢 Sample: {data[0].get('title', 'N/A')} at {data[0].get('company', 'N/A')}")
                    else:
                        self.log_result("Experiences API - Data Present", False, "No experiences found")
                else:
                    self.log_result("Experiences API - Response Format", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Experiences API - Response", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Experiences API - Connection", False, f"Error: {str(e)}")
    
    def test_skills_api(self):
        """Test GET /api/skills endpoint"""
        try:
            response = requests.get(f"{self.api_url}/skills", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check expected categories
                expected_categories = ['professional', 'technical', 'technology', 'soft']
                if isinstance(data, dict):
                    self.log_result("Skills API - Response Format", True)
                    
                    # Check if all expected categories are present
                    missing_cats = [cat for cat in expected_categories if cat not in data]
                    if missing_cats:
                        self.log_result("Skills API - Categories", False, f"Missing categories: {missing_cats}")
                    else:
                        self.log_result("Skills API - Categories", True)
                    
                    # Check soft skills subcategories
                    if 'soft' in data and isinstance(data['soft'], dict):
                        expected_subcats = ['social', 'process', 'generic']
                        soft_subcats = list(data['soft'].keys())
                        if all(subcat in expected_subcats for subcat in soft_subcats):
                            self.log_result("Skills API - Soft Skills Structure", True)
                        else:
                            self.log_result("Skills API - Soft Skills Structure", False, f"Unexpected subcategories: {soft_subcats}")
                    else:
                        self.log_result("Skills API - Soft Skills Structure", False, "Soft skills not properly structured")
                    
                    # Print sample data
                    for category in data:
                        if category == 'soft':
                            print(f"   🎯 {category}: {list(data[category].keys())}")
                        else:
                            skills_count = len(data[category]) if isinstance(data[category], list) else "N/A"
                            print(f"   🎯 {category}: {skills_count} skills")
                            
                else:
                    self.log_result("Skills API - Response Format", False, f"Expected dict, got: {type(data)}")
            else:
                self.log_result("Skills API - Response", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Skills API - Connection", False, f"Error: {str(e)}")
    
    def test_education_api(self):
        """Test GET /api/education endpoint"""
        try:
            response = requests.get(f"{self.api_url}/education", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.log_result("Education API - Response", True)
                
                # Print basic education info
                print(f"   🎓 Education data available: {bool(data)}")
                if data and isinstance(data, dict):
                    print(f"   🎓 Fields: {list(data.keys())}")
                    
            elif response.status_code == 404:
                self.log_result("Education API - Response", False, "Education information not found")
            else:
                self.log_result("Education API - Response", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Education API - Connection", False, f"Error: {str(e)}")
    
    def test_certifications_api(self):
        """Test GET /api/certifications endpoint"""
        try:
            response = requests.get(f"{self.api_url}/certifications", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_result("Certifications API - Response Format", True)
                    
                    # Check sorting if multiple certifications
                    if len(data) > 1 and all('order' in cert for cert in data):
                        orders = [cert['order'] for cert in data]
                        if orders == sorted(orders):
                            self.log_result("Certifications API - Sorting", True)
                        else:
                            self.log_result("Certifications API - Sorting", False, f"Not sorted by order: {orders}")
                    else:
                        self.log_result("Certifications API - Sorting", True, "Single/no order field")
                    
                    print(f"   🏆 Found {len(data)} certifications")
                    if data:
                        print(f"   🏆 Sample fields: {list(data[0].keys())}")
                        
                else:
                    self.log_result("Certifications API - Response Format", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Certifications API - Response", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Certifications API - Connection", False, f"Error: {str(e)}")
    
    def test_languages_api(self):
        """Test GET /api/languages endpoint"""
        try:
            response = requests.get(f"{self.api_url}/languages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_result("Languages API - Response Format", True)
                    
                    # Check for proficiency levels if data exists
                    if data:
                        has_proficiency = any('proficiency' in lang or 'level' in lang for lang in data)
                        if has_proficiency:
                            self.log_result("Languages API - Proficiency Levels", True)
                        else:
                            self.log_result("Languages API - Proficiency Levels", False, "No proficiency levels found")
                    
                    print(f"   🌐 Found {len(data)} languages")
                    if data:
                        print(f"   🌐 Sample fields: {list(data[0].keys())}")
                        
                else:
                    self.log_result("Languages API - Response Format", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Languages API - Response", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Languages API - Connection", False, f"Error: {str(e)}")
    
    def test_contact_form_api(self):
        """Test POST /api/contact endpoint"""
        try:
            # Test data with realistic information
            test_contact = {
                "name": "Ahmed Al-Hassan",
                "email": "ahmed.hassan@techcorp.com", 
                "company": "TechCorp Solutions",
                "subject": "Software Development Collaboration",
                "message": "I am interested in discussing a potential software development project. Could we schedule a call to discuss your availability and expertise in backend API development?"
            }
            
            response = requests.post(
                f"{self.api_url}/contact", 
                json=test_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                self.log_result("Contact Form API - Successful Submission", True)
                
                # Verify the response contains the submitted data
                for field in ['name', 'email', 'subject', 'message']:
                    if data.get(field) == test_contact[field]:
                        continue
                    else:
                        self.log_result("Contact Form API - Data Integrity", False, f"Field {field} mismatch")
                        return
                
                self.log_result("Contact Form API - Data Integrity", True)
                
                # Check for system fields
                system_fields = ['created_at', 'is_read']
                missing_system_fields = [field for field in system_fields if field not in data]
                if missing_system_fields:
                    self.log_result("Contact Form API - System Fields", False, f"Missing: {missing_system_fields}")
                else:
                    self.log_result("Contact Form API - System Fields", True)
                
                print(f"   📧 Contact form submitted successfully")
                print(f"   📧 Message ID: {data.get('_id', 'N/A')}")
                
            else:
                self.log_result("Contact Form API - Response", False, f"HTTP {response.status_code}: {response.text}")
        
        except Exception as e:
            self.log_result("Contact Form API - Connection", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Portfolio Backend API Testing")
        print(f"🔗 Base URL: {self.base_url}")
        print("=" * 60)
        
        self.test_personal_info_api()
        print()
        
        self.test_experiences_api()
        print()
        
        self.test_skills_api()
        print()
        
        self.test_education_api()
        print()
        
        self.test_certifications_api()
        print()
        
        self.test_languages_api()
        print()
        
        self.test_contact_form_api()
        print()
        
        # Print summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"🎯 Total: {self.results['passed'] + self.results['failed']}")
        
        if self.results['errors']:
            print("\n🚨 FAILURES:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)