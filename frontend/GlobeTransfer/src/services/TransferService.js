import axios from "axios";

const API_URL = "http://localhost:5000/api/transfers"; // Adjust based on your backend

const TransferService = {

    convertCurrency: async (fromCurrency, toCurrency, amount) => {
        try {
          const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
          const rate = response.data.rates[toCurrency];
          return amount * rate;
        } catch (error) {
          console.error("Error fetching exchange rate", error);
          throw error;
        }
      },
      
  getTransfers: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching transfers:", error);
      return [];
    }
  },

  saveTransfer: async (transferData, token) => {
    try {
      const response = await axios.post(API_URL, transferData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error saving transfer:", error);
      return null;
    }
  },

  removeTransfer: async (id, token) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error("Error removing transfer:", error);
      return false;
    }
  },
};

export default TransferService;
