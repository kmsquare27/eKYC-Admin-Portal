import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Refresh, Save } from "@mui/icons-material";

const ConfigActions = ({ onReset, onSave, isLoading, hasChanges }) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
    <Button
      variant="outlined"
      color="primary"
      startIcon={<Refresh />}
      onClick={onReset}
      disabled={isLoading || !hasChanges}
    >
      Reset to Defaults
    </Button>

    <Button
      variant="contained"
      color="primary"
      startIcon={
        isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />
      }
      onClick={onSave}
      disabled={isLoading || !hasChanges}
    >
      Save Changes
    </Button>
  </Box>
);

export default ConfigActions;
