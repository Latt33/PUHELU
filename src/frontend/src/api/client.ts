import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
