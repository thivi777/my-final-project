require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require("./config/passport");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Test root
app.get('/', (req, res) => res.send('Server is running!'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));