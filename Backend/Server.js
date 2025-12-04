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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// MongoDB connection cache for serverless
let connectionPromise = null;

const connectDB = async () => {
  // Return cached connection if ready
  if (mongoose.connection.readyState === 1) {
    console.log('✓ Using existing MongoDB connection');
    return mongoose.connection;
  }

  // If already connecting, return existing promise
  if (connectionPromise) {
    console.log('✓ Returning existing connection promise');
    return connectionPromise;
  }

  // Create new connection promise
  connectionPromise = (async () => {
    try {
      if (mongoose.connection.readyState !== 0 && mongoose.connection.readyState !== 1) {
        console.log('Closing stale connection');
        await mongoose.disconnect();
      }

      console.log('🔄 Connecting to MongoDB...');
      
      // CLEAN - No deprecated options
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 15000,
        maxPoolSize: 5,
        minPoolSize: 0,
        retryWrites: true,
        family: 4
      });
      
      console.log('✓ MongoDB Connected Successfully');
      return conn;
    } catch (error) {
      console.error('❌ MongoDB Connection Error:', {
        message: error.message,
        code: error.code,
        name: error.name
      });
      connectionPromise = null;
      throw error;
    }
  })();

  return connectionPromise;
};

// Middleware to ensure DB connection
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Registration Route
app.post('/api/auth/register', ensureDB, async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '7d' });

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
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Login Route
app.post('/api/auth/login', ensureDB, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password required' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });
    
    res.status(200).json({ 
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Update user details
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

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Routes
app.use('/api/auth', ensureDB, authRoutes);
app.use('/api/contact', ensureDB, contactRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ 
      status: 'ok', 
      message: 'Server is running',
      dbConnected: mongoose.connection.readyState === 1
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      message: 'Database connection failed',
      dbConnected: false
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: 'API is working',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error'
  });
});

// Local development server
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      const PORT = process.env.PORT || 5500;
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  })();
}

module.exports = app;
