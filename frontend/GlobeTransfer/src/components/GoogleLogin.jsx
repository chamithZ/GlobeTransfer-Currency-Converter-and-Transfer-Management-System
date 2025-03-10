import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';  // Import useDispatch hook
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation
import { setUser } from '../actions/authActions'; // Import the action for setting the user
import { googleAuth } from '../services/api'; // Assuming googleAuth is a function to get the user data

const GoogleLogin = () => {
  const dispatch = useDispatch();  // Initialize dispatch hook
  const navigate = useNavigate();  // Initialize useNavigate hook

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await googleAuth(authResult.code);  // Call API to fetch user data using auth code
        const user = result.data.data.user;
        
        // Dispatch the setUser action to store user in Redux state
        dispatch(setUser(user));

        // Save user data to localStorage to persist login state
        localStorage.setItem('user', JSON.stringify(user));

        alert('Successfully logged in');
        navigate('/');  // Redirect to home page after successful login
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <button style={{ padding: '10px 20px' }} onClick={googleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
