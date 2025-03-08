const express = require("express");
const {
  convertCurrency,
  saveTransfer,
  getTransfers,
  deleteTransfer,
} = require("../controllers/transferController");

const router = express.Router();

// Routes
router.get("/convert", convertCurrency);
router.post("/save", saveTransfer);
router.get("/", getTransfers);
router.delete("/:id", deleteTransfer);

module.exports = router;
