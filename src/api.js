import axios from 'axios';

// Default backend port used by local Express server
const DEFAULT_LOCALHOST = 'http://localhost:5500';

// Determine base URL priority:
// 1. `REACT_APP_API_URL` if provided (recommended for production / deploys)
// 2. During local development (running on localhost/127.0.0.1), prefer the local backend
//    so requests don't accidentally go to the React dev server (which causes 405 responses).
// 3. Otherwise use the current window origin (same origin)
// 4. Fallback to DEFAULT_LOCALHOST
const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? DEFAULT_LOCALHOST
    : (typeof window !== 'undefined' && window.location.origin) || DEFAULT_LOCALHOST);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;