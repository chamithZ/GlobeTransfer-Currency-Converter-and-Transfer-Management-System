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
    console.error("Error during currency conversion:", error);
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

const saveTransfer = async (req, res) => {
  const { fromCountry, toCountry, amount, convertedAmount, exchangeRate } = req.body;

  // Check if required fields are present
  if (!fromCountry || !toCountry || !amount || !convertedAmount || !exchangeRate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Convert values to numbers if they are provided as strings
  const numericAmount = parseFloat(amount);
  const numericConvertedAmount = parseFloat(convertedAmount);
  const numericExchangeRate = parseFloat(exchangeRate);

  // Validate the conversion to ensure they are valid numbers
  if (isNaN(numericAmount) || isNaN(numericConvertedAmount) || isNaN(numericExchangeRate)) {
    return res.status(400).json({ message: "Invalid number values for amount, convertedAmount, or exchangeRate" });
  }

  try {
    // Log the transfer details for debugging purposes
    console.log("Saving transfer with details:", { fromCountry, toCountry, amount: numericAmount, convertedAmount: numericConvertedAmount, exchangeRate: numericExchangeRate });

    // Create a new transfer entry
    const transfer = new Transfer({
      userId: req.user.id, // Ensure req.user is populated by authentication middleware
      fromCountry,
      toCountry,
      amount: numericAmount,
      convertedAmount: numericConvertedAmount,
      exchangeRate: numericExchangeRate,
    });

    // Save the transfer to the database
    await transfer.save();

    // Return the saved transfer with a 201 status
    res.status(201).json(transfer);
  } catch (error) {
    console.error("Error saving transfer:", error);
    res.status(500).json({ message: "Error saving transfer", error: error.message });
  }
};


// Get transfers (filtered by user)
const getTransfers = async (req, res) => {
  try {
    // Fetch transfers for the authenticated user, sorted by date
    const transfers = await Transfer.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    console.error("Error retrieving transfers:", error);
    res.status(500).json({ message: "Error retrieving transfers", error: error.message });
  }
};

const deleteTransfer = async (req, res) => {
  try {
    console.log("Transfer ID:", req.params.id); // Log the ID for debugging

    // Find and delete the transfer by its ID and the user's ID
    const transfer = await Transfer.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!transfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    // Respond with success message
    res.json({ message: "Transfer deleted successfully" });
  } catch (error) {
    console.error("Error deleting transfer:", error);
    res.status(500).json({ message: "Error deleting transfer", error: error.message });
  }
};


module.exports = { convertCurrency, saveTransfer, getTransfers, deleteTransfer };
