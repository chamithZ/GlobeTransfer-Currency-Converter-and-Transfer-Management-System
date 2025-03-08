import { useState } from "react";
import axios from "axios";

const API_URL = "https://api.exchangerate-api.com/v4/latest/";
const COUNTRIES = {
  USD: "USA",
  LKR: "Sri Lanka",
  AUD: "Australia",
  INR: "India",
};

export default function CurrencyConverter({ onTransfer }) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("LKR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    if (!amount) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error("Error fetching exchange rate", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = () => {
    if (!convertedAmount) return;
    const newTransfer = {
      id: Date.now(),
      from: fromCurrency,
      to: toCurrency,
      amount,
      convertedAmount,
    };
    onTransfer(newTransfer);
    setAmount("");
    setConvertedAmount(null);
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Currency Converter</h2>
      
      <div className="flex items-center mb-6">
        <div className="flex-1 mr-2">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <div className="relative">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 pl-3 border border-gray-200 rounded-md text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {Object.entries(COUNTRIES).map(([code, country]) => (
                <option key={code} value={code}>{`${country} (${code})`}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center mx-1">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
        </div>
        
        <div className="flex-1 ml-2">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <div className="relative">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 pl-3 border border-gray-200 rounded-md text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {Object.entries(COUNTRIES).map(([code, country]) => (
                <option key={code} value={code}>{`${country} (${code})`}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-xs text-gray-500 mb-1">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleConvert}
          disabled={isLoading || !amount}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md focus:outline-none transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Converting...
            </span>
          ) : "Convert"}
        </button>
        
        <button
          onClick={handleTransfer}
          disabled={convertedAmount === null}
          className={`flex-1 py-2 px-4 rounded-md text-sm focus:outline-none transition-colors ${
            convertedAmount !== null
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Transfer
        </button>
      </div>
      
      {convertedAmount !== null && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {amount} {fromCurrency}
            </span>
            <svg className="w-4 h-4 text-blue-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            <span className="text-sm font-medium text-gray-800">
              {convertedAmount.toFixed(2)} {toCurrency}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}