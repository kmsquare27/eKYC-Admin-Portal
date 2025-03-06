import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Default threshold values
const defaultThresholds = {
  ecToFaceMatch: 0.7,
  idToFaceMatch: 0.7,
  fatherNameMatching: 0.8,
  motherNameMatching: 0.8,
  nameBanglaMatching: 0.8,
  nameEnglishMatching: 0.8,
  dateOfBirthMatching: 0.9,
  idCardMatching: 0.85
};

// Async thunk for fetching configurations
export const fetchConfigurations = createAsyncThunk(
  'configurations/fetchConfigurations',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // In a real app, this would fetch from an API
      // For now, we'll use localStorage if available, or defaults
      const savedThresholds = localStorage.getItem('thresholdSettings');
      return savedThresholds ? JSON.parse(savedThresholds) : defaultThresholds;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for saving configurations
export const saveConfigurations = createAsyncThunk(
  'configurations/saveConfigurations',
  async (thresholds, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would save to an API
      // For now, we'll use localStorage
      localStorage.setItem('thresholdSettings', JSON.stringify(thresholds));
      return thresholds;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  thresholds: defaultThresholds,
  originalThresholds: defaultThresholds, // For reset functionality
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  saveStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  hasChanges: false
};

const configurationsSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    updateThreshold: (state, action) => {
      const { name, value } = action.payload;
      state.thresholds[name] = value;
      state.hasChanges = JSON.stringify(state.thresholds) !== JSON.stringify(state.originalThresholds);
    },
    resetThresholds: (state) => {
      state.thresholds = { ...state.originalThresholds };
      state.hasChanges = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch configurations
      .addCase(fetchConfigurations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfigurations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.thresholds = action.payload;
        state.originalThresholds = { ...action.payload };
        state.hasChanges = false;
      })
      .addCase(fetchConfigurations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Save configurations
      .addCase(saveConfigurations.pending, (state) => {
        state.saveStatus = 'loading';
      })
      .addCase(saveConfigurations.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded';
        state.thresholds = action.payload;
        state.originalThresholds = { ...action.payload };
        state.hasChanges = false;
      })
      .addCase(saveConfigurations.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateThreshold, resetThresholds } = configurationsSlice.actions;
export default configurationsSlice.reducer;
