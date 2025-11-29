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

// MongoDB connection cache for serverless - use global scope
let cachedDb = null;
let connectionPromise = null;

const connectDB = async () => {
  // Return cached connection if available and ready
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If already connecting, return the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }

  // Create new connection promise
  connectionPromise = (async () => {
    try {
      // Close existing connection if in wrong state
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }

      console.log('Connecting to MongoDB...');
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000, // Reduced from 5s to 3s
        socketTimeoutMS: 30000, // Reduced from 45s to 30s
        maxPoolSize: 1, // Important for serverless - limit connections
        minPoolSize: 0,
        maxIdleTimeMS: 30000,
      });
      
      cachedDb = conn;
      console.log('MongoDB Connected Successfully');
      return conn;
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      connectionPromise = null; // Reset on error
      throw error;
    }
  })();

  return connectionPromise;
};

// Middleware to ensure DB connection - with timeout
const ensureDB = async (req, res, next) => {
  try {
    // Set a timeout for the entire connection process
    const connectionTimeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database connection timeout')), 3000);
    });

    await Promise.race([connectDB(), connectionTimeout]);
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
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
    const existingUser = await User.findOne({ email }).maxTimeMS(2000);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password with reduced rounds for faster processing (8 instead of 10)
    const hashedPassword = await bcrypt.hash(password, 8);

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
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Login Route - with DB connection check
app.post('/api/auth/login', ensureDB, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).maxTimeMS(2000);
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
      dbConnected: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware - must be last
app.use((err, req, res, next) => {
  console.error('Error middleware:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// For Vercel serverless - export as an async handler function
module.exports = async (req, res) => {
  try {
    // Don't connect here - let the middleware handle it per route
    // This prevents blocking the entire handler
    app(req, res);
  } catch (error) {
    console.error('Serverless handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

// For local development - start server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
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
