const Transfer = require("../models/Transfer");
const { getExchangeRate } = require("../services/TransferService");

const convertCurrency = async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ message: "Missing required query parameters" });
  }

  try {
    const exchangeRate = await getExchangeRate(from, to);
    if (!exchangeRate) {
      return res.status(400).json({ message: "Invalid currency code" });
    }
    res.json({ from, to, amount, convertedAmount: amount * exchangeRate, exchangeRate });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

// Save transfer (linked to user)
const saveTransfer = async (req, res) => {
  const { fromCountry, toCountry, amount, convertedAmount, exchangeRate } = req.body;
  if (!fromCountry || !toCountry || !amount || !convertedAmount || !exchangeRate) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const transfer = new Transfer({ userId: req.user.id, fromCountry, toCountry, amount, convertedAmount, exchangeRate });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (error) {
    res.status(500).json({ message: "Error saving transfer", error: error.message });
  }
};

// Get transfers (filtered by user)
const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transfers", error: error.message });
  }
};

const deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!transfer) return res.status(404).json({ message: "Transfer not found" });
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transfer", error: error.message });
  }
};

module.exports = { convertCurrency, saveTransfer, getTransfers, deleteTransfer };
