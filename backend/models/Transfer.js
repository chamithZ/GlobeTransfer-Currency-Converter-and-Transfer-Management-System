const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Add userId reference to User model
  fromCountry: { type: String, required: true },
  toCountry: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  exchangeRate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transfer", transferSchema);
