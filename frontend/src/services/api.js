import axios from 'axios';

// Get backend URL from environment
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const portfolioAPI = {
  // Personal Information
  getPersonalInfo: () => apiClient.get('/personal'),
  
  // Experiences
  getExperiences: () => apiClient.get('/experiences'),
  
  // Skills
  getSkills: () => apiClient.get('/skills'),
  
  // Education
  getEducation: () => apiClient.get('/education'),
  
  // Certifications
  getCertifications: () => apiClient.get('/certifications'),
  
  // Languages
  getLanguages: () => apiClient.get('/languages'),
  
  // Contact
  submitContactForm: (contactData) => apiClient.post('/contact', contactData),
};

export default apiClient;