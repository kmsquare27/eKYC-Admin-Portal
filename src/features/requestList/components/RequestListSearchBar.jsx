import React from "react";
import {
  Paper, Grid, TextField, InputAdornment, IconButton,
  FormControl, Select, MenuItem, Tooltip, CircularProgress
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon, Refresh as RefreshIcon } from "@mui/icons-material";

const RequestListSearchBar = ({
  searchQuery, searchField, onSearchChange, onFieldChange,
  onClear, onRefresh, loading, resultCount, theme
}) => (
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
    <Grid container spacing={2} alignItems="center">
      {/* 🔍 Search */}
      <Grid item xs={12} sm={6} md={8}>
        <TextField
          fullWidth
          placeholder="Search requests..."
          value={searchQuery}
          onChange={onSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={onClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 1.5,
              backgroundColor: "background.default",
              "&:hover": { backgroundColor: "action.hover" },
            },
          }}
        />
      </Grid>

      {/* 🧭 Filter */}
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth variant="outlined" size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              backgroundColor: "background.default",
              "&:hover": { backgroundColor: "action.hover" },
            },
          }}>
          <Select value={searchField} onChange={onFieldChange} displayEmpty>
            <MenuItem value="all">All Fields</MenuItem>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="uuid">UUID</MenuItem>
            <MenuItem value="userReference">User Reference</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>

    {/* Refresh + count */}
    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
      <Grid item>
        <span style={{ color: theme.palette.text.secondary, fontSize: "0.875rem" }}>
          {resultCount} {resultCount === 1 ? "result" : "results"} found
        </span>
      </Grid>
      <Grid item>
        <Tooltip title="Refresh data">
          <IconButton
            size="small"
            onClick={onRefresh}
            disabled={loading}
            sx={{
              color: theme.palette.primary.main,
              "&:hover": { backgroundColor: `${theme.palette.primary.main}14` },
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  </Paper>
);

export default RequestListSearchBar;
