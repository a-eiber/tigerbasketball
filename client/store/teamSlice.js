import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  teams: [],
};

// Create new team
export const createTeam = createAsyncThunk(
  'teams/create',
  async (teamData, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.post('/api/teams', teamData, {
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

// Get all teams
export const getTeams = createAsyncThunk(
  'teams/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/teams');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams.push(action.payload);
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = action.payload;
      });
  },
});

export default teamSlice.reducer;
