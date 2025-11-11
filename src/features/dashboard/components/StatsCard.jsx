import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { 
  TrendingUp, 
  CheckCircle, 
  Error, 
  Pending,
  Business,
  AccountBalance
} from '@mui/icons-material';

const iconMap = {
  total: TrendingUp,
  success: CheckCircle,
  failed: Error,
  pending: Pending,
  companies: Business,
  bill: AccountBalance
};

const colorMap = {
  total: 'primary',
  success: 'success',
  failed: 'error',
  pending: 'warning',
  companies: 'info',
  bill: 'info'
};

const StatsCard = ({ title, value, type }) => {
  const theme = useTheme();
  const Icon = iconMap[type];
  const color = theme.palette[colorMap[type]].main;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          backgroundColor: `${color}14`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ color: color, fontSize: 24 }} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight="600">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsCard;
