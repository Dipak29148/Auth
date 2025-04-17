// src/Components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          if (!isLoggingOut) {
            addToast('No authentication token found. Please log in.', 'error');
            setTimeout(() => {
              window.location.href = '/login';
            }, 500);
          }
          return; // Don't redirect immediately if we're logging out
        }

        const response = await axios.get('http://localhost:5500/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUser(response.data);
          setNewName(response.data.name);
          setNewEmail(response.data.email);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        addToast('Failed to load user data. Please try again later.', 'error');
      }
    };

    fetchUser();
  }, [addToast, isLoggingOut]);

  const handleLogout = () => {
    // Prevent multiple logout attempts
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    localStorage.removeItem('authToken');
    addToast('Logged out successfully!', 'success');
    
    // Increase delay to 3 seconds to ensure toast is visible
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put('http://localhost:5500/api/auth/user', {
        name: newName,
        email: newEmail,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setEditMode(false);
      addToast('User details updated successfully!', 'success');
    } catch (error) {
      console.error('Failed to update user details:', error);
      addToast('Failed to update user details.', 'error');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <h1>Welcome, {user.name}!</h1>
        {!editMode ? (
          <div className="user-details">
            <p className="user-name">Name: {user.name}</p>
            <p className="user-email">Email: {user.email}</p>
            <button className="edit-button" onClick={handleEdit}>Edit Info</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="edit-form">
            <h2>Edit User Information</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="edit-input"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              className="edit-input"
            />
            <button className="save-button" onClick={handleSave}>Save Changes</button>
            <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;