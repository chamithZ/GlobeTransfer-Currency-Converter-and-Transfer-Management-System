import { useState } from "react";
import TransferService from "../services/TransferService";

export default function CurrencyConverter({ onTransfer }) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("LKR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleConvert = async () => {
    if (!amount) return;
    setIsLoading(true);
    try {
      const result = await TransferService.convertCurrency(fromCurrency, toCurrency, amount);
      setConvertedAmount(result);
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!convertedAmount) return;
    const newTransfer = {
      fromCountry: fromCurrency,
      toCountry: toCurrency,
      amount,
      convertedAmount,
      exchangeRate: (convertedAmount / amount).toFixed(2),
    };

    try {
      const savedTransfer = await TransferService.saveTransfer(newTransfer, localStorage.getItem("token"));
      onTransfer(savedTransfer);
      setAmount("");
      setConvertedAmount(null);
      setSuccessMessage("Transfer successfully completed!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Currency Converter</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md text-sm">
          {successMessage}
        </div>
      )}
      
      <div className="flex items-center mb-6">
        <div className="flex-1 mr-2">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="USD">USA (USD)</option>
            <option value="LKR">Sri Lanka (LKR)</option>
            <option value="AUD">Australia (AUD)</option>
            <option value="INR">India (INR)</option>
          </select>
        </div>
        
        <div className="flex items-center justify-center mx-1">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
        </div>
        
        <div className="flex-1 ml-2">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="USD">USA (USD)</option>
            <option value="LKR">Sri Lanka (LKR)</option>
            <option value="AUD">Australia (AUD)</option>
            <option value="INR">India (INR)</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs text-gray-500 mb-1">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-md text-sm"
        />
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleConvert}
          disabled={isLoading || !amount}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-full"
        >
          {isLoading ? "Converting..." : "Convert"}
        </button>
        
        <button
          onClick={handleTransfer}
          disabled={convertedAmount === null}
          className={`flex-1 py-2 px-4 rounded-full text-sm ${convertedAmount !== null
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
