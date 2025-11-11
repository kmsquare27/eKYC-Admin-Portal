import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData, setTimeRange, setECTimeRange } from '../../store/slices/dashboardSlice';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  CheckCircle,
  Warning,
  Error,
  AttachMoney,
  AccessTime,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import RequestBarChart from './components/RequestBarChart';
import StatusPieChart from './components/StatusPieChart';
import ECStatusPieChart from './components/ECStatusPieChart'; 

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 3 },
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}14`,
            borderRadius: '12px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color: color, fontSize: { xs: 24, sm: 28 } }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            ml: 2,
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          fontSize: { xs: '1.5rem', sm: '2rem' },
          mb: 0.5,
        }}
      >
        {value}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
};

const DashboardPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { 
    stats, 
    chartData, 
    ecStatusData,
    timeRange, 
    ecTimeRange,
    status,
    error 
  } = useSelector(state => state.dashboard);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Fetch dashboard data when component mounts
    if (status === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, status]);

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      dispatch(setTimeRange(newTimeRange));
    }
  };

  const handleECTimeRangeChange = (newTimeRange) => {
    dispatch(setECTimeRange(newTimeRange));
  };

  const handleRefresh = () => {
    dispatch(fetchDashboardData());
  };

  // If data is loading and we don't have any stats yet
  if (status === 'loading' && !stats) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '50vh' 
      }}>
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  // If there was an error
  if (status === 'failed' && error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <RefreshIcon 
              sx={{ cursor: 'pointer' }} 
              onClick={handleRefresh}
            />
          }
        >
          Failed to load dashboard data: {error}
        </Alert>
      </Box>
    );
  }

  // If we don't have data yet, don't render anything
  if (!stats || !chartData || !ecStatusData) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests.toLocaleString(),
      icon: TrendingUp,
      color: theme.palette.primary.main,
      subtitle: 'All time requests',
    },
    {
      title: 'Success Rate',
      value: `${(parseFloat(stats.successRate) * 100).toFixed(1)}%`,
      icon: CheckCircle,
      color: theme.palette.success.main,
      subtitle: 'Overall success rate',
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: Warning,
      color: theme.palette.warning.main,
      subtitle: 'Awaiting processing',
    },
    {
      title: 'Failed Requests',
      value: stats.failedRequests,
      icon: Error,
      color: theme.palette.error.main,
      subtitle: 'Requires attention',
    },
    {
      title: 'Total Bill',
      value: `৳${stats.totalBill.toLocaleString()}`,
      icon: AttachMoney,
      color: theme.palette.info.main,
      subtitle: 'Current month',
    },
    {
      title: 'Avg. Process Time',
      value: `${stats.avgProcessTime}s`,
      icon: AccessTime,
      color: theme.palette.secondary.main,
      subtitle: 'Last 24 hours',
    },
  ];

  // Mock status data for the pie chart
  const mockStatusData = {
    success: stats.totalRequests * parseFloat(stats.successRate),
    failed: stats.failedRequests,
    pending: stats.pendingRequests
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: { xs: 2, sm: 3 },
      }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
          }}
        >
          <TrendingUp sx={{ fontSize: { xs: 24, sm: 28 } }} />
          Dashboard Overview
        </Typography>
        
        {status === 'loading' ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          <RefreshIcon 
            sx={{ 
              cursor: 'pointer',
              color: theme.palette.primary.main,
              '&:hover': { opacity: 0.8 }
            }} 
            onClick={handleRefresh}
          />
        )}
      </Box>
      
      {/* Stat Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
      
      {/* Time Range Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              px: 3,
              py: 0.5,
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                backgroundColor: `${theme.palette.primary.main}14`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}24`,
                },
              },
            },
          }}
        >
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Charts */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} md={8}>
          <RequestBarChart 
            data={chartData[timeRange]} 
            period={timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatusPieChart data={mockStatusData} />
        </Grid>
      </Grid>

      {/* EC Status Section */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={6}>
          <ECStatusPieChart 
            data={ecStatusData[ecTimeRange]}
            timeRange={ecTimeRange}
            onTimeRangeChange={handleECTimeRangeChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
