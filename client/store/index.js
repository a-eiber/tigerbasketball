import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storyReducer from './storySlice';
import gameReducer from './gameSlice';
import teamReducer from './teamSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stories: storyReducer,
    games: gameReducer,
    teams: teamReducer,
  },
});
