import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ submitting: true, success: false, error: null });
    
    axios.post('http://localhost:5500/api/contact/send-message', formData)
      .then((response) => {
        console.log('Response:', response);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setSubmitStatus({ submitting: false, success: true, error: null });
        addToast('Your message has been sent successfully!', 'success');
      })
      .catch((error) => {
        console.error('There was an error submitting the form!', error);
        setSubmitStatus({ submitting: false, success: false, error: null });
        addToast('Failed to send message. Please try again.', 'error');
      });
  };

  return (
    <div style={{ marginTop: '80px', paddingBottom: '150px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2 className="text-center mb-0">Contact Us</h2>
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
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={submitStatus.submitting}
                    >
                      {submitStatus.submitting ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
