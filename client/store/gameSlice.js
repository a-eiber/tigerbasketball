import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
};

// Create new game
export const createGame = createAsyncThunk(
  'games/create',
  async (gameData, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.post('/api/games', gameData, {
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

// Get all games
export const getGames = createAsyncThunk(
  'games/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/games');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

// Delete Game
export const deleteGame = createAsyncThunk(
  'games/delete',
  async (id, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.delete(`/api/games/${id}`, {
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

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGame.fulfilled, (state, action) => {
        state.games.push(action.payload);
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter(
          (game) => game.id !== action.payload.id,
        );
      });
  },
});

export default gameSlice.reducer;
