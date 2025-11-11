import React from 'react';
import { Card as MuiCard, CardContent, Typography, Box } from '@mui/material';

const Card = ({ title, value, icon }) => {
  return (
    <MuiCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </Box>
          {icon && (
            <Box sx={{ color: 'primary.main' }}>
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
