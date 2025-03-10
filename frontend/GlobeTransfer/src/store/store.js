// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Import the combined rootReducer

const store = configureStore({
  reducer: rootReducer, // Pass rootReducer to the reducer key
});

export default store; // Default export the store
