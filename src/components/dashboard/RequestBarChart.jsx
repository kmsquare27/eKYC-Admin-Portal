import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RequestBarChart = ({ data, period }) => {
  const theme = useTheme();

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Requests',
        data: data.values,
        backgroundColor: `${theme.palette.primary.main}33`,
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: `${theme.palette.primary.main}66`,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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
          title: (context) => `${period} Requests: ${context[0].label}`,
          label: (context) => `Total: ${context.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 8,
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
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          color: 'text.primary',
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.125rem' },
        }}
      >
        {period} Request Trends
      </Typography>
      <Box sx={{ height: { xs: 300, sm: 350 } }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default RequestBarChart;
