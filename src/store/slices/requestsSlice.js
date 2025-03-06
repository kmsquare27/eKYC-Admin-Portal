import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Generate dummy data - in a real app, this would be replaced with API calls
const generateDummyData = (count) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const timestamp = new Date(2025, 2, 6, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    data.push({
      id: i,
      uuid: `UUID-${Math.random().toString(36).substr(2, 9)}`,
      userReference: `USER-${Math.random().toString(36).substr(2, 6)}`,
      ecToFaceScore: (Math.random() * (1 - 0.7) + 0.7).toFixed(2),
      idToFaceScore: (Math.random() * (1 - 0.7) + 0.7).toFixed(2),
      fatherNameScore: (Math.random() * (1 - 0.8) + 0.8).toFixed(2),
      motherNameScore: (Math.random() * (1 - 0.8) + 0.8).toFixed(2),
      nameBnScore: (Math.random() * (1 - 0.8) + 0.8).toFixed(2),
      dobScore: (Math.random() * (1 - 0.9) + 0.9).toFixed(2),
      idCardScore: (Math.random() * (1 - 0.85) + 0.85).toFixed(2),
      timestamp: timestamp,
    });
  }
  return data;
};

// Async thunk for fetching requests
export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return generateDummyData(100);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default requestsSlice.reducer;
