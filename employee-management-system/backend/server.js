const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const colors = require('colors');

// Load env vars first
dotenv.config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');

const app = express();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const employees = require('./routes/employees');
const users = require('./routes/users');

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Compression middleware
app.use(compression());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/employees', employees);
app.use('/api/users', users);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});


// Add this BEFORE your error handler middleware in server.js
app.post('/api/test/create-user', async (req, res) => {
  try {
    const User = require('./models/User');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    if (existingUser) {
      return res.json({
        success: true,
        message: 'User already exists',
        user: { email: existingUser.email, name: existingUser.name }
      });
    }

    const user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin'
    });

    res.json({
      success: true,
      message: 'Test user created successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});


// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow?.bold || `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red || `Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`.red || `Error: ${err.message}`);
  process.exit(1);
});
