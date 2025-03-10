import { useState, useEffect } from "react";
import TransferService from "../services/TransferService";

export default function TransferHistory() {
  const [transfers, setTransfers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // success, error, warning
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const token = localStorage.getItem("token");

  // Fetch transfers from backend
  useEffect(() => {
    const fetchTransfers = async () => {
      if (!token) {
        setAlertMessage("No authentication token found");
        setAlertType("error");
        setShowAlert(true);
        return;
      }
      try {
        const data = await TransferService.getTransfers(token);
        setTransfers(data);
      } catch (error) {
        setAlertMessage("Failed to load transfers");
        setAlertType("error");
        setShowAlert(true);
      }
    };
    fetchTransfers();
  }, [token]);

  // Show confirmation dialog
  const confirmRemove = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  // Handle remove transfer
  const handleRemove = async () => {
    if (!token) {
      setAlertMessage("No authentication token found");
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    
    try {
      const success = await TransferService.removeTransfer(deleteId, token);
      if (success) {
        setTransfers(transfers.filter((transfer) => transfer._id !== deleteId));
        setAlertMessage("Transfer successfully removed");
        setAlertType("success");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Failed to remove transfer");
      setAlertType("error");
      setShowAlert(true);
    }
    
    // Hide confirmation dialog
    setShowConfirmation(false);
    setDeleteId(null);
  };

  // Close alert
  const closeAlert = () => {
    setShowAlert(false);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Alert Component */}
      {showAlert && (
        <div className={`px-4 py-3 rounded relative ${
          alertType === "success" ? "bg-green-100 border border-green-400 text-green-700" : 
          alertType === "error" ? "bg-red-100 border border-red-400 text-red-700" :
          "bg-yellow-100 border border-yellow-400 text-yellow-700"
        }`}>
          <span className="block sm:inline">{alertMessage}</span>
          <button 
            onClick={closeAlert}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">Remove Transfer</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to remove this transfer? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-600 text-white py-4 px-6">
        <h2 className="text-xl font-semibold">Transfer History</h2>
        <p className="text-blue-100">{transfers.length} transfers</p>
      </div>

      {transfers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-blue-50">
          <div className="text-blue-400 mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p className="text-gray-600 text-lg">No transfers yet</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transfers.map((transfer) => (
            <li key={transfer._id} className="hover:bg-gray-50">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-medium">
                      {transfer.amount} {transfer.from}
                    </span>
                    <svg className="w-5 h-5 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                    <span className="text-gray-800 font-medium">
                      {transfer.convertedAmount.toFixed(2)} {transfer.to}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(transfer.date).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => confirmRemove(transfer._id)}
                  className="text-sm text-red-500 hover:text-red-700 focus:outline-none transition duration-300"
                >
                  Revoke
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}