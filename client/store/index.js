import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storyReducer from './storySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storyReducer,
  },
});
