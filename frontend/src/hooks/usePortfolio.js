import { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

// Personal Information Hook
export const usePersonalInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getPersonalInfo();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch personal information');
        console.error('Error fetching personal info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  return { data, loading, error };
};

// Experiences Hook
export const useExperiences = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getExperiences();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { data, loading, error };
};

// Skills Hook
export const useSkills = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getSkills();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch skills');
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { data, loading, error };
};

// Education Hook
export const useEducation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getEducation();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch education');
        console.error('Error fetching education:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { data, loading, error };
};

// Certifications Hook
export const useCertifications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getCertifications();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch certifications');
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return { data, loading, error };
};

// Languages Hook
export const useLanguages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const response = await portfolioAPI.getLanguages();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch languages');
        console.error('Error fetching languages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { data, loading, error };
};

// Contact Form Hook
export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await portfolioAPI.submitContactForm(formData);
      setSuccess(true);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to submit contact form';
      setError(errorMessage);
      console.error('Error submitting contact form:', err);
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitForm, loading, error, success, resetForm };
};