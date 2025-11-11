import React from 'react';
import { Paper, Typography, Box, useTheme, FormControl, Select, MenuItem } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ECStatusPieChart = ({ data, timeRange, onTimeRangeChange }) => {
  const theme = useTheme();

  const chartData = {
    labels: ['Found in EC', 'Not Found in EC'],
    datasets: [
      {
        data: [data.found, data.notFound],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.error.main,
        ],
        borderColor: [
          theme.palette.success.main,
          theme.palette.error.main,
        ],
        borderWidth: 1,
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
          font: {
            size: 12,
            family: theme.typography.fontFamily,
          },
          padding: 20,
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
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = data.found + data.notFound;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          EC Request Status
        </Typography>
        <FormControl size="small">
          <Select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            sx={{
              minWidth: 120,
              '& .MuiSelect-select': {
                py: 0.75,
              },
            }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ height: 300, position: 'relative' }}>
        <Doughnut data={chartData} options={options} />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
            {((data.found / (data.found + data.notFound)) * 100).toFixed(1)}%
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Found Rate
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: theme.palette.error.main, fontWeight: 600 }}>
            {((data.notFound / (data.found + data.notFound)) * 100).toFixed(1)}%
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Not Found Rate
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ECStatusPieChart;
