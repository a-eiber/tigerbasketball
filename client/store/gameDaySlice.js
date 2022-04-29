import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  gameDays: [],
};

// Create new game day
export const createGameDay = createAsyncThunk(
  'gameDay/create',
  async (date, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.post('/api/gameDay', date, {
        headers: {
          authorization: adminToken,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

// Get all game days
export const getGameDays = createAsyncThunk(
  'gameDay/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/gameDay');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

// Delete Game Day
export const deleteGameDay = createAsyncThunk(
  'gameDay/delete',
  async (id, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.delete(`/api/gameDay/${id}`, {
        headers: {
          authorization: adminToken,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const gameDaySlice = createSlice({
  name: 'gameDays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGameDay.fulfilled, (state, action) => {
        state.gameDays.push(action.payload);
      })
      .addCase(getGameDays.fulfilled, (state, action) => {
        state.gameDays = action.payload;
      })
      .addCase(deleteGameDay.fulfilled, (state, action) => {
        state.gameDays = state.gameDays.filter(
          (gameDay) => gameDay.id !== action.payload.id,
        );
      });
  },
});

export default gameDaySlice.reducer;
