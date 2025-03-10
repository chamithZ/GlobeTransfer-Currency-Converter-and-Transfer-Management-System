// src/reducers/index.js
import { combineReducers } from 'redux'; // Import combineReducers
import authReducer from './authReducer'; // Import your authReducer

// Combine all reducers (in case you have multiple reducers)
const rootReducer = combineReducers({
  auth: authReducer, // You can add more reducers here as needed
});

export default rootReducer; // Export combined reducers
