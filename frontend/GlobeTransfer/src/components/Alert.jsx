import React from "react";

const Alert = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4 py-3 rounded-lg shadow-lg ${
        type === "success"
          ? "bg-green-100 border-l-4 border-green-500 text-green-700"
          : "bg-red-100 border-l-4 border-red-500 text-red-700"
      } transition-all duration-500 ease-in-out z-50`}
    >
      <div className="flex items-center">
        <div className="py-1">
          {type === "success" ? (
            <svg
              className="h-6 w-6 text-green-500 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-red-500 mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div>
          <p className="font-bold">{type === "success" ? "Success!" : "Error!"}</p>
          <p className="text-sm">{message}</p>
        </div>
        <button onClick={onClose} className="ml-auto">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
