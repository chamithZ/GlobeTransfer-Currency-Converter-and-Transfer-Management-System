const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  fromCountry: { type: String, required: true },
  toCountry: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  exchangeRate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transfer", transferSchema)