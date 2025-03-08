export default function TransferHistory({ transfers, onRemove }) {
    return (
      <div className="p-6 bg-white rounded-lg shadow border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Transfer History</h2>
          <span className="text-sm text-gray-500">{transfers.length} transfers</span>
        </div>
        
        {transfers.length === 0 ? (
          <div className="py-8 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p>No transfers yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {transfers.map((transfer) => (
              <li key={transfer.id} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">{transfer.amount} {transfer.from}</span>
                      <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                      <span className="font-medium text-gray-700">{transfer.convertedAmount.toFixed(2)} {transfer.to}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(transfer.id)}
                  className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Revoke
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }