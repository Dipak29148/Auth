import axios from 'axios';

// Use environment variable for backend URL in production.
// Fallbacks:
// - If running in browser and no env var is set, use same origin for relative `/api` calls.
// - As a last resort in local dev, fall back to http://localhost:5500.
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '') ||
  'http://localhost:5500';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;