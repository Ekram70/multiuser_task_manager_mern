// Basic library import
const express = require('express');
const router = require('./src/routes/api');
const app = express();

// Security Middleware Library Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');

// Security Middleware Implement
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// request size limit
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb' }));

// Database Library Import
const mongoose = require('mongoose');

// Request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });

// Common Middleware Implement
app.use(limiter);

// MongoDB database connection
const DBURI = 'mongodb://localhost:27017/todo';

mongoose.connect(DBURI, (error) => {
  if (!error) {
    console.log('MongoDB connection successful');
  } else {
    console.log(error);
  }
});

// Routing Implement
app.use('/api/v1', router);

// undefined routes implement
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: 'not found',
  });
});

// export the module
module.exports = app;
