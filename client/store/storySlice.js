import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stories: [],
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

// Delete Story
export const deleteStory = createAsyncThunk(
  'stories/delete',
  async (id, thunkAPI) => {
    try {
      const adminToken = localStorage.getItem('token');
      const response = await axios.delete(`/api/stories/${id}`, {
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

export const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStory.fulfilled, (state, action) => {
        state.stories.push(action.payload);
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.stories = action.payload;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.stories = state.stories.filter(
          (story) => story.id !== action.payload.id,
        );
      });
  },
});

export default storySlice.reducer;
