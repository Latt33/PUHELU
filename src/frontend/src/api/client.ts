import axios from 'axios';

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Update to match your FastAPI server url if different
  headers: {
    'Content-Type': 'application/json',
  },
});
