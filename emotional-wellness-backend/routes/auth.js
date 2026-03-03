const express = require("express");
const passport = require("passport");
const { register, login, logout, forgotPassword, resetPassword, googleCallback } = require("../controllers/authcontroller");

const router = express.Router();

// Local auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

module.exports = router;