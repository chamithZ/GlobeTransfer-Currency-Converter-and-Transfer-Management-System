const express = require("express");
const { convertCurrency, saveTransfer, getTransfers, deleteTransfer } = require("../controllers/TransferController");
const jwt = require("jsonwebtoken");

const router = express.Router();

const protect = (req, res, next) => {
  let token;

  // Check if token exists in authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
  } 
  // Check if token exists in cookies
  else if (req.cookies.jwt) {
      token = req.cookies.jwt;
  }

  // Log which source the token was found from
  console.log("Token from header or cookie:", token);

  // If no token exists, return an error
  if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Log decoded token to ensure it's valid
      console.log("Decoded JWT:", decoded);
      
      // Attach user to request object
      req.user = decoded; 
      next();
  } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};


router.get("/convert", convertCurrency);

// Protect transfer routes with the 'protect' middleware
router.post("/", protect, saveTransfer);
router.get("/", protect, getTransfers);
router.delete("/:id", protect, deleteTransfer);

module.exports = router;
