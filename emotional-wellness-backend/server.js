require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require("./config/passport");

const authRoutes = require('./routes/auth');          // User authentication routes
const adminAuthRoutes = require('./routes/adminAuth'); // Admin authentication routes
const responseRoutes = require('./routes/responseRoutes'); // Response routes
const userRoutes = require('./routes/userRoutes');     // User profile and management routes
const journalRoutes = require('./routes/journalRoutes'); // Journal routes

const app = express();

// Connect MongoDB
connectDB();

// ----- Middleware -----
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

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

// Test root
app.get('/', (req, res) => res.send('Server is running!'));

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));