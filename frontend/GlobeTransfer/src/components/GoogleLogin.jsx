import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../actions/authActions';
import { googleAuth } from '../services/api';
import Alert from '../components/Alert';

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult.code);
        const user = result.data.data.user;

        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user));

        setAlert({ message: "Successfully logged in! Redirecting...", type: "success" });

        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
      setAlert({ message: "Login failed. Please try again.", type: "error" });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-blue-600">🌍 Globe Transfer</h2>
        <p className="mt-2 text-gray-600">Easily and securely sign in with your Google account</p>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <button
            onClick={googleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
