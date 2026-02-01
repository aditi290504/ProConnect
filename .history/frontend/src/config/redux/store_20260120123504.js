import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/reducer/authReducer/index.js';

/**
 * Redux store configuration
 * steps for state management
 * submit action
 * handle action in its reducer
 * register here > reducer
 */

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    post
  },
});