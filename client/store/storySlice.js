import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new story
export const createStory = createAsyncThunk(
  'stories/create',
  async (storyData, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.post('/api/stories', storyData, {
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

// Get all stories
export const getStories = createAsyncThunk(
  'stories/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/stories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  },
);

export const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stories.push(action.payload);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stories = action.payload;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = storySlice.actions;
export default storySlice.reducer;
