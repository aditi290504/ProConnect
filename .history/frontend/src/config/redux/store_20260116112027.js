import { configureStore } from '@reduxjs/toolkit';
im

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
  },
});