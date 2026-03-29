import axios from 'axios';

// Determine the base URL and optional prefix based on the environment
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const apiPrefix = import.meta.env.VITE_API_PREFIX || '';

// Normalize and join baseURL + prefix without duplicate slashes
const normalize = (s: string) => s.replace(/\/+$|^\/+/g, '');
const fullBase = (() => {
  const root = baseURL.replace(/\/+$/g, '');
  const prefix = apiPrefix ? `/${normalize(apiPrefix)}` : '';
  return `${root}${prefix}`;
})();

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: fullBase,
  headers: {
    'Content-Type': 'application/json',
  },
});
