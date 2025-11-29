const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contactRoutes');

// Import User model
const User = require('./models/User');

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// MongoDB connection cache for serverless
let cachedDb = null;

const connectDB = async () => {
  // Return cached connection if available
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    // If already connecting, wait for it
    if (mongoose.connection.readyState === 2) {
      await new Promise((resolve) => {
        mongoose.connection.once('connected', resolve);
      });
      return mongoose.connection;
    }

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });
    cachedDb = conn;
    console.log('MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

// Middleware to ensure DB connection before handling requests
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed. Please try again.',
    });
  }
};

// Registration Route - with DB connection check
app.post('/api/auth/register', ensureDB, async (req, res) => {
  console.log('Registration request received:', req.body);

  try {
    // Trim input fields
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password with timeout handling
    const hashedPassword = await Promise.race([
      bcrypt.hash(password, 10),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Password hashing timeout')), 5000)
      )
    ]);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message === 'Password hashing timeout' 
        ? 'Server timeout. Please try again.' 
        : 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Login Route - with DB connection check
app.post('/api/auth/login', ensureDB, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get user details
app.get('/api/auth/user', ensureDB, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied' });
    }
    
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update user details
app.put('/api/auth/user', ensureDB, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied' });
    }
    
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const decoded = jwt.verify(token, jwtSecret);

    const { name, email } = req.body;

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Failed to update user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Routes
app.use('/api/auth', ensureDB, authRoutes);
app.use('/api/contact', ensureDB, contactRoutes);

// Test API endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: 'API is working',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    vercel: process.env.VERCEL || false
  });
});

// Health check endpoint with DB connection
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ 
      status: 'ok', 
      message: 'Server is running',
      dbConnected: mongoose.connection.readyState === 1
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      dbConnected: false
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// For Vercel serverless - export the handler
module.exports = app;

// For local development - start server
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  (async () => {
    try {
      await connectDB();
      const PORT = process.env.PORT || 5500;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  })();
}
