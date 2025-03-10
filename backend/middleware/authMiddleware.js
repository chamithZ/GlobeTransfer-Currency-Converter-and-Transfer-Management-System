const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Google OAuth Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }), // Fail if authentication fails
  (req, res) => {
    // After Google login, a valid token will be generated
    const { token } = req.user; // JWT generated from Passport callback

    // Redirect to frontend with the token
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  },
  (err, req, res, next) => {
    console.error('Error during Google OAuth:', err);
    res.status(500).json({ message: 'OAuth Error', error: err });
  }
);

module.exports = router;
