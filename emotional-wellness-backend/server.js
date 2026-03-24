require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require("./config/passport");
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/erromiddelware');

const authRoutes = require('./routes/auth');          // User authentication routes
const adminAuthRoutes = require('./routes/adminAuth'); // Admin authentication routes
const responseRoutes = require('./routes/responseRoutes'); // Response routes
const userRoutes = require('./routes/userRoutes');     // User profile and management routes
const journalRoutes = require('./routes/journalRoutes'); // Journal routes
const activityRoutes = require('./routes/activityRoutes');
const goalRoutes = require('./routes/goalRoutes');
const moodLogRoutes = require('./routes/moodLogRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const emergencyContactRoutes = require('./routes/emergencyContactRoutes');
const affirmationRoutes = require('./routes/affirmationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Validate essential env variables
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    console.error(`FATAL ERROR: ${env} is not defined in .env`);
    process.exit(1);
  }
});

// Connect MongoDB
connectDB();

// ----- Middleware -----
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Security Middleware
app.use(helmet()); // Set security headers

// Custom NoSQL Injection Protection for Express 5
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);
  // req.query is sanitized by copy to avoid read-only property errors
  const sanitizedQuery = sanitize(req.query);
  for (let key in sanitizedQuery) {
    if (sanitizedQuery.hasOwnProperty(key)) {
      req.query[key] = sanitizedQuery[key];
    }
  }
  next();
});

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// ----- Routes -----
// Admin authentication routes
app.use('/api/admin/auth', adminAuthRoutes);

// User authentication routes
app.use('/api/auth', authRoutes);

// Response routes
app.use('/api/responses', responseRoutes);

// User profile and management routes
app.use('/api/users', userRoutes);

// Journal routes
app.use('/api/journals', journalRoutes);

// Activity routes
app.use('/api/activities', activityRoutes);

// Goal routes
app.use('/api/goals', goalRoutes);

// Mood Log routes
app.use('/api/mood-logs', moodLogRoutes);

// Resource routes
app.use('/api/resources', resourceRoutes);

// Emergency Contact routes
app.use('/api/emergency-contacts', emergencyContactRoutes);

// Affirmation routes
app.use('/api/affirmations', affirmationRoutes);

// Analytics routes
app.use('/api/analytics', analyticsRoutes);

// Test root
app.get('/', (req, res) => res.send('Server is running!'));

// ----- 404 Handler for API -----
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// ----- Error Handler -----
app.use(errorHandler);

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));