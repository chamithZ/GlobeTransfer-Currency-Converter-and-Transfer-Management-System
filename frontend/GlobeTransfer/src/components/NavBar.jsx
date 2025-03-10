import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../actions/authActions';

export default function NavBar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(setUser(null));
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md w-full py-4 px-6 md:px-8 fixed top-0 left-0 right-0 flex justify-between items-center z-50">
      <div className="flex items-center">
      <span className="text-blue-400 text-xl font-bold">🌍 Globe<span className="text-green-500">Transfer</span></span>
      </div>

      {user ? (
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-gray-800 font-semibold text-sm sm:text-base">{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 text-sm rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 text-sm rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      )}
    </nav>
  );
}