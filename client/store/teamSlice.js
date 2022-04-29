import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  teams: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
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
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = teamSlice.actions;
export default teamSlice.reducer;
