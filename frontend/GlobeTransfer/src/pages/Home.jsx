import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../actions/authActions';
import CurrencyConverter from '../components/CurrencyConverter';
import TransferHistory from '../components/TransferHistory';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import HeroSection from '../components/Hero';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [transfers, setTransfers] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  const [showConverter, setShowConverter] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    
    // Apply background to document body to ensure full coverage
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#f0f9ff';
    document.body.style.width = '100%';
    document.body.style.overflow = 'auto';
    
    return () => {
      // Clean up styles when component unmounts
      document.body.style.backgroundColor = '';
    };
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

  const handleShowConverter = () => {
    setShowConverter(true);
    // Scroll to converter section
    document.getElementById('converter-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar Component */}
      <NavBar user={user} />
      
      <main className="flex-grow w-full pt-16">
        {/* Hero Section (only show when converter is hidden) */}
        {!showConverter && (
          <HeroSection onShowConverter={handleShowConverter} />
        )}
        
        {/* Converter Section */}
        <div 
          id="converter-section" 
          className="flex flex-col items-center justify-center w-full px-4 py-8"
        >
          {showConverter && (
            <div className="w-full max-w-md sm:max-w-lg bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
                Fast & Secure Currency Transfers
              </h2>

              {/* Currency Converter */}
              <CurrencyConverter onTransfer={addTransfer} />

              {/* Transfer History (Only for Logged-in Users) */}
              {user ? (
                <>
                  <p className="text-gray-700 text-center mt-4">
                    Welcome, <span className="font-semibold">{user.name}</span> ({user.email})
                  </p>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => setViewHistory(!viewHistory)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      {viewHistory ? 'Hide History' : 'View History'}
                    </button>
                  </div>

                  {viewHistory && (
                    <div className="mt-6">
                      <TransferHistory transfers={transfers} onRemove={removeTransfer} />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-700 text-center mt-4">
                  Login to track your transactions and history.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
}