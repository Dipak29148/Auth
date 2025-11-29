import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Trim form data before sending
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };
  
    try {
      console.log('Submitting registration to API...');
      const response = await axios.post(
        '/api/auth/register',
        trimmedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 15000, // 15 second timeout
        }
      );
  
      if (response.data.success) {
        console.log('Registration successful:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        addToast('Registration successful!', 'success');
        setFormData({ name: '', email: '', password: '' });
        // Redirect to login
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        // Ensure message is always a string
        const errorMsg = response.data?.message;
        setError(typeof errorMsg === 'string' ? errorMsg : 'Registration failed');
      }
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again later.';

      if (error.code === 'ECONNABORTED' || error.code === 'ERR_BAD_RESPONSE') {
        // Handle timeout and gateway errors
        if (error.response?.status === 504) {
          errorMessage = 'The server is taking too long to respond. Please try again in a moment.';
        } else {
          errorMessage = 'Request timed out. The server is taking too long to respond.';
        }
      } else if (error.response) {
        // Handle different response data types more defensively
        const responseData = error.response.data;
        
        // Handle 504 Gateway Timeout
        if (error.response.status === 504) {
          errorMessage = 'Server timeout. Please try again in a moment.';
        } else if (responseData && typeof responseData === 'object' && responseData !== null) {
          // Extract message or error property, ensuring it's a string
          const msg = responseData.message || responseData.error;
          if (typeof msg === 'string' && msg.length > 0) {
            errorMessage = msg;
          } else {
            errorMessage = `Error: ${error.response.status} ${error.response.statusText || 'Unknown error'}`;
          }
        } else if (typeof responseData === 'string') {
          errorMessage = responseData;
        } else {
          errorMessage = `Error: ${error.response.status} ${error.response.statusText || 'Unexpected server response'}`;
        }
      } else if (error.message && typeof error.message === 'string') {
        errorMessage = error.message;
      }

      // Final safety check - ensure errorMessage is always a string
      setError(String(errorMessage || 'Registration failed. Please try again later.'));
      console.error('Registration error:', error);
      
      // Also show toast for better UX
      if (error.response?.status === 504) {
        addToast('Server timeout. Please try again.', 'error');
      }
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
                <h3 className="text-center mb-0">Create an Account</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Registering...' : 'Register'}
                    </button>
                  </div>
                  {error && (
                    <div className="alert alert-danger mt-3">
                      {typeof error === 'string' ? error : String(error || 'An error occurred')}
                    </div>
                  )}
                </form>
              </div>
              <div className="card-footer text-center">
                Already have an account? <a href="/login">Login here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;