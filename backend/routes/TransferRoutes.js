const express = require("express");
const {
  convertCurrency,
  saveTransfer,
  getTransfers,
  deleteTransfer,
} = require("../controllers/transferController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Public Route - Anyone can convert
router.get("/convert", convertCurrency);

// Protected Routes - Require login
router.post("/save", authenticateUser, saveTransfer);
router.get("/", authenticateUser, getTransfers);
router.delete("/:id", authenticateUser, deleteTransfer);

module.exports = router;
