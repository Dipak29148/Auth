const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact/send-message
router.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }
    
    // Create new contact submission
    const newContact = new Contact({
      name,
      email,
      message
    });
    
    // Save to database
    await newContact.save();
    
    // Send success response
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while submitting your message.'
    });
  }
});

// GET /api/contact/messages (Admin only endpoint - should be protected)
router.get('/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contact messages'
    });
  }
});

module.exports = router;
