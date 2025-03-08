const express = require("express");
const axios = require("axios");
const Transfer = require("../models/Transfer");
require("dotenv").config();

const router = express.Router();

// Fetch exchange rate
router.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ message: "Missing required query parameters" });
  }

  try {
    const response = await axios.get(
      `${process.env.EXCHANGE_RATE_API_URL}${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`
    );
    
    const exchangeRate = response.data.conversion_rates[to];
    
    if (!exchangeRate) {
      return res.status(400).json({ message: "Invalid currency code" });
    }

    const convertedAmount = amount * exchangeRate;

    res.json({ from, to, amount, convertedAmount, exchangeRate });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exchange rate", error: error.message });
  }
});

// Save transfer
router.post("/save", async (req, res) => {
  const { fromCountry, toCountry, amount, convertedAmount, exchangeRate } = req.body;

  if (!fromCountry || !toCountry || !amount || !convertedAmount || !exchangeRate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transfer = new Transfer({ fromCountry, toCountry, amount, convertedAmount, exchangeRate });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (error) {
    res.status(500).json({ message: "Error saving transfer", error: error.message });
  }
});

// Get all transfers
router.get("/", async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transfers", error: error.message });
  }
});

// Delete a transfer
router.delete("/:id", async (req, res) => {
  try {
    const transfer = await Transfer.findByIdAndDelete(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transfer", error: error.message });
  }
});

module.exports = router;
