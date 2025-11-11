import React from 'react';
import { Paper, Typography, Box, useTheme, ToggleButtonGroup, ToggleButton, Grid } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { CheckCircle, Cancel } from '@mui/icons-material';

const ECStatsPieChart = ({ data, timeRange, onTimeRangeChange }) => {
  const theme = useTheme();

  const foundData = {
    labels: ['Found in EC', 'Not Found in EC'],
    datasets: [
      {
        data: [data[timeRange].foundInEC, data[timeRange].totalSentToEC - data[timeRange].foundInEC],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.error.main,
        ],
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: theme.palette.text.primary,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
  };

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      onTimeRangeChange(newTimeRange);
    }
  };

  const currentStats = data[timeRange];
  const successRate = ((currentStats.foundInEC / currentStats.totalSentToEC) * 100).toFixed(1);
  const failureRate = (((currentStats.totalSentToEC - currentStats.foundInEC) / currentStats.totalSentToEC) * 100).toFixed(1);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <Box sx={{ 
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="h6" color="text.primary">
            EC Request Statistics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distribution of EC verification results
          </Typography>
        </Box>
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

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 2,
            borderRadius: 1,
            bgcolor: `${theme.palette.success.main}14`
          }}>
            <CheckCircle sx={{ color: theme.palette.success.main }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Success Rate
              </Typography>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                {successRate}%
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 2,
            borderRadius: 1,
            bgcolor: `${theme.palette.error.main}14`
          }}>
            <Cancel sx={{ color: theme.palette.error.main }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Not Found Rate
              </Typography>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                {failureRate}%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '50%', height: '100%' }}>
          <Pie data={foundData} options={options} />
        </Box>
      </Box>
    </Paper>
  );
};

export default ECStatsPieChart;
