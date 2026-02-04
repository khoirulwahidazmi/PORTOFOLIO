# Portfolio Backend API Contracts

## Overview
This document outlines the API contracts for Muhammad Khoirul Wahid Azmi's portfolio website backend implementation.

## Current Mock Data (to be replaced)
The following data is currently mocked in `/app/frontend/src/data/mock.js`:
- Personal information (name, contact, summary)
- Work experiences with achievements
- Skills (professional, technical, technology, soft skills)
- Education details
- Certifications
- Organizational experience
- Languages
- Testimonials (mock)

## Database Models

### 1. PersonalInfo Model
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  subtitle: String,
  profileImage: String, // URL to image
  location: String,
  email: String,
  phone: String,
  linkedin: String,
  cvUrl: String,
  summary: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Experience Model
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  period: String,
  location: String,
  achievements: [String],
  order: Number, // for sorting
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Skills Model
```javascript
{
  _id: ObjectId,
  category: String, // 'professional', 'technical', 'technology', 'soft'
  subcategory: String, // for soft skills: 'social', 'process', 'generic'
  skills: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Education Model
```javascript
{
  _id: ObjectId,
  degree: String,
  university: String,
  faculty: String,
  major: String,
  gpa: String,
  period: String,
  location: String,
  achievements: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Certification Model
```javascript
{
  _id: ObjectId,
  title: String,
  issuer: String,
  date: String,
  type: String,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. OrganizationExperience Model
```javascript
{
  _id: ObjectId,
  title: String,
  organization: String,
  period: String,
  achievements: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Language Model
```javascript
{
  _id: ObjectId,
  language: String,
  level: String, // 'Native', 'Proficient', 'Basic'
  createdAt: Date,
  updatedAt: Date
}
```

### 8. ContactMessage Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  company: String,
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Personal Information
- `GET /api/personal` - Get personal information
- `PUT /api/personal` - Update personal information (admin only)

### Experiences
- `GET /api/experiences` - Get all work experiences (sorted by order)
- `POST /api/experiences` - Create new experience (admin only)
- `PUT /api/experiences/:id` - Update experience (admin only)
- `DELETE /api/experiences/:id` - Delete experience (admin only)

### Skills
- `GET /api/skills` - Get all skills grouped by category
- `POST /api/skills` - Create/update skills (admin only)
- `PUT /api/skills/:id` - Update skills (admin only)

### Education
- `GET /api/education` - Get education information
- `PUT /api/education` - Update education (admin only)

### Certifications
- `GET /api/certifications` - Get all certifications (sorted by date)
- `POST /api/certifications` - Create certification (admin only)
- `PUT /api/certifications/:id` - Update certification (admin only)
- `DELETE /api/certifications/:id` - Delete certification (admin only)

### Organization Experience
- `GET /api/organizations` - Get organization experiences
- `POST /api/organizations` - Create organization experience (admin only)
- `PUT /api/organizations/:id` - Update organization experience (admin only)

### Languages
- `GET /api/languages` - Get all languages
- `POST /api/languages` - Create language (admin only)
- `PUT /api/languages/:id` - Update language (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin only)
- `PUT /api/contact/messages/:id/read` - Mark message as read (admin only)

## Frontend Integration Plan

### 1. API Service Layer
Create `/app/frontend/src/services/api.js` with:
- HTTP client configuration using axios
- All API call functions
- Error handling
- Loading states management

### 2. React Hooks for Data Fetching
Create custom hooks in `/app/frontend/src/hooks/`:
- `usePersonalInfo()` - For personal information
- `useExperiences()` - For work experiences
- `useSkills()` - For skills data
- `useEducation()` - For education data
- `useCertifications()` - For certifications
- `useLanguages()` - For languages

### 3. Component Updates
- Remove mock data imports
- Replace with API hooks
- Add loading and error states
- Add data validation

### 4. Contact Form Integration
- Connect contact form to backend API
- Add form validation
- Success/error messaging
- Form submission handling

## Data Migration Strategy

1. **Seed Database**: Create seed script to populate database with current mock data
2. **Data Validation**: Ensure all data from CV is accurately represented
3. **Testing**: Verify all endpoints work correctly
4. **Frontend Integration**: Update components to use real API calls
5. **Error Handling**: Implement proper error handling for network issues

## Authentication (Future Enhancement)
- Admin authentication for content management
- JWT tokens for secure API access
- Protected routes for admin functions

## Performance Considerations
- Database indexing for frequently queried fields
- Response caching where appropriate
- Pagination for large datasets (future)
- Image optimization for profile pictures

## Security Measures
- Input validation and sanitization
- CORS configuration
- Rate limiting for contact form
- Environment variables for sensitive data
- MongoDB connection security

## Testing Strategy
- Unit tests for API endpoints
- Integration tests for database operations
- Frontend-backend integration testing
- Contact form functionality testing
- Error handling verification

This contract ensures smooth integration between frontend mock data and backend implementation while maintaining data integrity and user experience.