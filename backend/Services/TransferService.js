const axios = require("axios");

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(
      `${process.env.EXCHANGE_RATE_API_URL}${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`
    );

    return response.data.conversion_rates[to] || null;
  } catch (error) {
    console.error("❌ Error fetching exchange rate:", error.message);
    return null;
  }
};

module.exports = { getExchangeRate };
