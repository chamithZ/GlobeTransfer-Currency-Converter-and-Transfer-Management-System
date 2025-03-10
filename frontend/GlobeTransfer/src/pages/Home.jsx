import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../actions/authActions';
import CurrencyConverter from '../components/CurrencyConverter';
import TransferHistory from '../components/TransferHistory';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [transfers, setTransfers] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch, user]);

  const addTransfer = (transfer) => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not logged in
      return;
    }
    setTransfers([...transfers, transfer]);
  };

  const removeTransfer = (id) => {
    setTransfers(transfers.filter((t) => t.id !== id));
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(setUser(null));
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Full-Width Navbar */}
      <nav className="bg-white shadow-md w-full py-4 px-4 sm:px-8 fixed top-0 left-0 flex justify-between items-center z-50">
        <span className="text-blue-600 text-xl sm:text-2xl font-bold">🌍 Globe Transfer</span>

        {user ? (
          <div className="flex items-center space-x-2 sm:space-x-6">
            <span className="text-gray-800 font-semibold text-sm sm:text-base">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        )}
      </nav>

      {/* Full-Screen Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-28 pb-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-2xl space-y-4 sm:space-y-6">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
            Fast & Secure Currency Transfers
          </h2>

          {/* Currency Converter (Always Visible) */}
          <CurrencyConverter onTransfer={addTransfer} />

          {/* Transfer History (Only for Logged-in Users) */}
          {user ? (
            <>
              <p className="text-gray-700 text-center text-sm sm:text-base">
                Welcome, <span className="font-semibold">{user.name}</span> ({user.email})
              </p>

              <div className="text-center mt-4 sm:mt-6">
                <button
                  onClick={() => setViewHistory(!viewHistory)}
                  className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {viewHistory ? 'Hide History' : 'View History'}
                </button>
              </div>

              {viewHistory && (
                <div className="mt-4 sm:mt-6">
                  <TransferHistory transfers={transfers} onRemove={removeTransfer} />
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-700 text-center text-sm sm:text-base">
              Login to track your transactions and history.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}