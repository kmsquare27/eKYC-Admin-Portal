import React from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";

const ConfigHeader = ({ loading }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Settings />
        Matching Threshold Configurations
      </Typography>
      {loading && <CircularProgress size={24} color="primary" />}
    </Box>
  );
};

export default ConfigHeader;
