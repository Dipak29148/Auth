import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('authToken', response.data.token);
        onLogin(true);
        setError(null);
        addToast('Login successful!', 'success');
        window.location.href = '/dashboard';
      } else {
        setError(null);
        addToast('Login failed!', 'error');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(null);
      addToast('Invalid credentials. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '80px', paddingBottom: '150px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3 className="text-center mb-0">Login to Your Account</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
              </div>
              <div className="card-footer text-center">
                Don't have an account? <a href="/registration">Register here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
