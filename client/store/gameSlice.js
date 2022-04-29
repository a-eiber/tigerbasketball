import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  games: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
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
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games.push(action.payload);
      })
      .addCase(createGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = state.games.filter(
          (game) => game.id !== action.payload.id,
        );
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;
