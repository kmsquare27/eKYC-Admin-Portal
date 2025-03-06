import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Generate dummy stats - in a real app, this would be replaced with API calls
const generateDummyStats = () => ({
  totalRequests: Math.floor(Math.random() * 1000) + 500,
  successRate: (Math.random() * (0.98 - 0.85) + 0.85).toFixed(2),
  pendingRequests: Math.floor(Math.random() * 50) + 10,
  failedRequests: Math.floor(Math.random() * 30) + 5,
  totalBill: Math.floor(Math.random() * 50000) + 10000,
  avgProcessTime: (Math.random() * (5 - 2) + 2).toFixed(1),
});

// Generate EC status data
const generateECStatusData = (timeRange) => {
  const baseFound = Math.floor(Math.random() * 800) + 200;
  const baseNotFound = Math.floor(Math.random() * 200) + 50;
  
  const multiplier = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365
  };

  return {
    found: baseFound * multiplier[timeRange],
    notFound: baseNotFound * multiplier[timeRange]
  };
};

// Mock chart data
const generateChartData = () => ({
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [150, 230, 180, 290, 200, 140, 180]
  },
  monthly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [980, 1200, 1100, 950]
  },
  yearly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [3200, 3800, 3600, 4200, 3900, 4100, 4500, 4300, 4700, 4200, 4600, 4800]
  }
});

// Async thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        stats: generateDummyStats(),
        chartData: generateChartData(),
        ecStatusData: {
          daily: generateECStatusData('daily'),
          weekly: generateECStatusData('weekly'),
          monthly: generateECStatusData('monthly'),
          yearly: generateECStatusData('yearly'),
        }
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: null,
  chartData: null,
  ecStatusData: null,
  timeRange: 'weekly',
  ecTimeRange: 'monthly',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
    setECTimeRange: (state, action) => {
      state.ecTimeRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats;
        state.chartData = action.payload.chartData;
        state.ecStatusData = action.payload.ecStatusData;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setTimeRange, setECTimeRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;
