import React from "react";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Tooltip,
  IconButton,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  RestartAlt as ResetIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@date-io/date-fns";
import ExportButton from "./ExportButton";

const ReportsFilterForm = ({
  dateFrom,
  dateTo,
  requestType,
  onDateFromChange,
  onDateToChange,
  onRequestTypeChange,
  onReset,
  onRefresh,
  loading,
  resultCount,
  filteredData,
  theme,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "text.primary",
          fontSize: { xs: "1rem", sm: "1.125rem" },
        }}
      >
        Activity Log Filters
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2} alignItems="center">
          {/* From Date */}
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="From Date"
              value={dateFrom}
              onChange={onDateFromChange}
              maxDate={dateTo || new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  InputProps: {
                    sx: {
                      borderRadius: 1.5,
                      backgroundColor: "background.default",
                      "&:hover": { backgroundColor: "action.hover" },
                    },
                  },
                },
              }}
            />
          </Grid>

          {/* To Date */}
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="To Date"
              value={dateTo}
              onChange={onDateToChange}
              minDate={dateFrom}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  InputProps: {
                    sx: {
                      borderRadius: 1.5,
                      backgroundColor: "background.default",
                      "&:hover": { backgroundColor: "action.hover" },
                    },
                  },
                },
              }}
            />
          </Grid>

          {/* Request Type Dropdown */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  backgroundColor: "background.default",
                  "&:hover": { backgroundColor: "action.hover" },
                },
              }}
            >
              <Select
                value={requestType}
                onChange={(e) => onRequestTypeChange(e.target.value)}
                displayEmpty
              >
                <MenuItem value="all">Total Requests</MenuItem>
                <MenuItem value="pending">Pending Requests</MenuItem>
                <MenuItem value="failed">Failed Requests</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Tooltip title="Reset Filters">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onReset}
                  startIcon={<ResetIcon />}
                  sx={{
                    borderRadius: 1.5,
                    textTransform: "none",
                    borderColor: "divider",
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: `${theme.palette.primary.main}08`,
                    },
                  }}
                >
                  Reset
                </Button>
              </Tooltip>

              <ExportButton data={filteredData} theme={theme} />
            </Box>
          </Grid>
        </Grid>
      </LocalizationProvider>

      {/* Results Count & Refresh */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
      >
        <Grid item>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            {resultCount} {resultCount === 1 ? "result" : "results"} found
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Refresh data">
            <IconButton
              size="small"
              onClick={onRefresh}
              disabled={loading}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: `${theme.palette.primary.main}14`,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <RefreshIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReportsFilterForm;