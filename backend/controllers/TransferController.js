const Transfer = require("../models/Transfer");
const { getExchangeRate } = require("../services/exchangeRateService");

// Convert Currency
const convertCurrency = async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ message: "Missing required query parameters" });
  }

  try {
    const exchangeRate = await getExchangeRate(from, to);

    if (!exchangeRate) {
      return res.status(400).json({ message: "Invalid currency code or API issue" });
    }

    const convertedAmount = amount * exchangeRate;
    res.json({ from, to, amount, convertedAmount, exchangeRate });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

// Save Transfer Record
const saveTransfer = async (req, res) => {
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
};

// Get Transfer History
const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transfers", error: error.message });
  }
};

// Delete Transfer
const deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findByIdAndDelete(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transfer", error: error.message });
  }
};

module.exports = { convertCurrency, saveTransfer, getTransfers, deleteTransfer };
