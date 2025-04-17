const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
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
  credentials: true,
}));
app.use(bodyParser.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../build')));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Registration Route
app.post('/api/auth/register', async (req, res) => {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
      error: error.message,
    });
  }
});
// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send JWT
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get user details
app.get('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
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
app.put('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
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
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Start the Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}
