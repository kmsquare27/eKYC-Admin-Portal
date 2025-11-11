import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Paper, Typography, useTheme } from '@mui/material';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = ({ data }) => {
  const theme = useTheme();

  const chartData = {
    labels: ['Success', 'Failed', 'Pending'],
    datasets: [
      {
        data: [data.success, data.failed, data.pending],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.error.main,
          theme.palette.warning.main,
        ],
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
        hoverOffset: 4,
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
          padding: 20,
          color: theme.palette.text.secondary,
          usePointStyle: true,
          pointStyle: 'circle',
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
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const total = data.success + data.failed + data.pending;
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
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
        Request Status Distribution
      </Typography>
      <Box sx={{ height: { xs: 300, sm: 350 }, display: 'flex', alignItems: 'center' }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Paper>
  );
};

export default StatusPieChart;
