import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfigurations,
  saveConfigurations,
  updateThreshold,
  resetThresholds,
} from "../../store/slices/configurationsSlice";
import { Box, Paper, Divider, CircularProgress, Typography, Alert, Button } from "@mui/material";
import ConfigHeader from "./components/ConfigHeader";
import ConfigIntro from "./components/ConfigIntro";
import ConfigThresholdList from "./components/ConfigThresholdList";
import ConfigActions from "./components/ConfigActions";
import ConfigSnackbar from "./components/ConfigSnackbar";

const ConfigurationsPage = () => {
  const dispatch = useDispatch();
  const { thresholds, status, saveStatus, error, hasChanges } = useSelector(
    (state) => state.configurations
  );

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (status === "idle") dispatch(fetchConfigurations());
  }, [dispatch, status]);

  useEffect(() => {
    if (saveStatus === "succeeded")
      setSnackbar({ open: true, message: "Configurations saved!", severity: "success" });
    else if (saveStatus === "failed")
      setSnackbar({ open: true, message: "Save failed. Try again.", severity: "error" });
  }, [saveStatus]);

  const handleThresholdChange = (key, value) =>
    dispatch(updateThreshold({ name: key, value }));

  const handleSave = () => dispatch(saveConfigurations(thresholds));

  const handleReset = () => {
    dispatch(resetThresholds());
    setSnackbar({
      open: true,
      message: "Configurations reset to default values.",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  const isLoading = status === "loading" || saveStatus === "loading";

  if (status === "loading" && Object.keys(thresholds).length === 0)
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress size={50} />
        <Typography sx={{ mt: 2 }}>Loading configurations...</Typography>
      </Box>
    );

  if (status === "failed" && error)
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => dispatch(fetchConfigurations())}>
              Retry
            </Button>
          }
        >
          Failed to load configurations: {error}
        </Alert>
      </Box>
    );

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <ConfigHeader loading={isLoading} />

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <ConfigIntro />
        <ConfigThresholdList
          thresholds={thresholds}
          onChange={handleThresholdChange}
          disabled={isLoading}
        />
        <Divider sx={{ mb: 3 }} />
        <ConfigActions
          onReset={handleReset}
          onSave={handleSave}
          isLoading={isLoading}
          hasChanges={hasChanges}
        />
      </Paper>

      <ConfigSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </Box>
  );
};

export default ConfigurationsPage;
