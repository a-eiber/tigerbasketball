import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  players: [],
};

// Create new player
export const createPlayer = createAsyncThunk(
  'players/create',
  async (playerData, thunkAPI) => {
    try {
      const response = await axios.post('/api/players', playerData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

// Get all players
export const getPlayers = createAsyncThunk(
  'players/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/players');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

// // Delete Game
// export const deleteGame = createAsyncThunk(
//   'games/delete',
//   async (id, thunkAPI) => {
//     try {
//       const adminToken = localStorage.getItem('token');
//       const response = await axios.delete(`/api/games/${id}`, {
//         headers: {
//           authorization: adminToken,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.toString());
//     }
//   },
// );

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.players.push(action.payload);
      })
      .addCase(getPlayers.fulfilled, (state, action) => {
        state.players = action.payload;
      });
    // .addCase(deleteGame.fulfilled, (state, action) => {
    //   state.games = state.games.filter(
    //     (game) => game.id !== action.payload.id,
    //   );
    // });
  },
});

export default playerSlice.reducer;
