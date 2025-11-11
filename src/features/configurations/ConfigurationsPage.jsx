import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfigurations,
  saveConfigurations,
  updateThreshold,
  resetThresholds,
} from "../../store/slices/configurationsSlice";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Slider,
  TextField,
  Button,
  Alert,
  Snackbar,
  Divider,
  useTheme,
  Card,
  CardContent,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Settings,
  Save,
  Refresh,
  CompareArrows,
  Face,
  Person,
  CalendarMonth,
  Badge,
  Translate,
} from "@mui/icons-material";

/**
 * Reusable threshold slider component
 */
const ThresholdSlider = ({
  label,
  value,
  onChange,
  icon: Icon,
  description,
  disabled,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <CardContent>
        {/* Title + Icon */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${theme.palette.primary.main}14`,
              borderRadius: "12px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <Icon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
        </Box>

        {/* Description */}
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}

        {/* Slider + Numeric Input */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} sm={9}>
            <Slider
              value={value}
              onChange={(_, newValue) => onChange(newValue)}
              aria-labelledby={`${label}-slider`}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={100}
              disabled={disabled}
              sx={{
                color: theme.palette.primary.main,
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                },
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3}>
            <TextField
              value={value}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
                  onChange(newValue);
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                max: 100,
                type: "number",
              }}
              variant="outlined"
              size="small"
              fullWidth
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const ConfigurationsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { thresholds, status, saveStatus, error, hasChanges } = useSelector(
    (state) => state.configurations
  );

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  // 🔄 Fetch initial configurations
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchConfigurations());
    }
  }, [dispatch, status]);

  // ✅ Show snackbar on save result
  useEffect(() => {
    if (saveStatus === "succeeded") {
      setSnackbar({
        open: true,
        message: "Threshold configurations saved successfully!",
        severity: "success",
      });
    } else if (saveStatus === "failed") {
      setSnackbar({
        open: true,
        message: "Failed to save configurations. Please try again.",
        severity: "error",
      });
    }
  }, [saveStatus]);

  // 🧭 Handlers
  const handleThresholdChange = (key, value) => {
    dispatch(updateThreshold({ name: key, value }));
  };

  const handleSave = () => {
    dispatch(saveConfigurations(thresholds));
  };

  const handleReset = () => {
    dispatch(resetThresholds());
    setSnackbar({
      open: true,
      message: "Threshold configurations reset to default values.",
      severity: "info",
    });
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const isLoading = status === "loading" || saveStatus === "loading";

  // 🌀 Loading UI
  if (status === "loading" && Object.keys(thresholds).length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
          Loading configurations...
        </Typography>
      </Box>
    );
  }

  // ❌ Error UI
  if (status === "failed" && error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => dispatch(fetchConfigurations())}
            >
              Retry
            </Button>
          }
        >
          Failed to load configurations: {error}
        </Alert>
      </Box>
    );
  }

  // 🧩 Main Content
  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      {/* Header */}
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
        {isLoading && <CircularProgress size={24} color="primary" />}
      </Box>

      {/* Config Panel */}
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
        <Typography variant="body1" paragraph>
          Configure the minimum threshold percentage required for various
          matching criteria. These thresholds determine when a match is
          considered valid during the verification process.
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Setting thresholds too high may increase false negatives (legitimate
          users being rejected). Setting them too low may increase false
          positives (unauthorized access).
        </Alert>

        {/* Threshold Controls */}
        <Box sx={{ mb: 4 }}>
          <ThresholdSlider
            label="EC to Face Match"
            value={thresholds.ecToFaceMatch || 0}
            onChange={(v) => handleThresholdChange("ecToFaceMatch", v)}
            icon={Face}
            description="Minimum similarity required between EC photo and user's face"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="ID to Face Match"
            value={thresholds.idToFaceMatch || 0}
            onChange={(v) => handleThresholdChange("idToFaceMatch", v)}
            icon={CompareArrows}
            description="Minimum similarity required between ID photo and user's face"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="Father Name Matching"
            value={thresholds.fatherNameMatching || 0}
            onChange={(v) => handleThresholdChange("fatherNameMatching", v)}
            icon={Person}
            description="Minimum similarity required for father's name verification"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="Mother Name Matching"
            value={thresholds.motherNameMatching || 0}
            onChange={(v) => handleThresholdChange("motherNameMatching", v)}
            icon={Person}
            description="Minimum similarity required for mother's name verification"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="Name (Bangla) Matching"
            value={thresholds.nameBanglaMatching || 0}
            onChange={(v) => handleThresholdChange("nameBanglaMatching", v)}
            icon={Translate}
            description="Minimum similarity required for Bangla name verification"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="Name (English) Matching"
            value={thresholds.nameEnglishMatching || 0}
            onChange={(v) => handleThresholdChange("nameEnglishMatching", v)}
            icon={Translate}
            description="Minimum similarity required for English name verification"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="Date of Birth Matching"
            value={thresholds.dateOfBirthMatching || 0}
            onChange={(v) => handleThresholdChange("dateOfBirthMatching", v)}
            icon={CalendarMonth}
            description="Minimum similarity required for date of birth verification"
            disabled={isLoading}
          />
          <ThresholdSlider
            label="ID Card Matching"
            value={thresholds.idCardMatching || 0}
            onChange={(v) => handleThresholdChange("idCardMatching", v)}
            icon={Badge}
            description="Minimum similarity required for ID card verification"
            disabled={isLoading}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Refresh />}
            onClick={handleReset}
            disabled={isLoading || !hasChanges}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Save />
              )
            }
            onClick={handleSave}
            disabled={isLoading || !hasChanges}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConfigurationsPage;
