import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../store/slices/requestsSlice";
import {
  Box,
  Paper,
  Typography,
  Chip,
  useTheme,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useMediaQuery,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility,
  Search as SearchIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const RequestListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { items: rows, status, error } = useSelector((state) => state.requests);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ Fetch request data when mounted
  useEffect(() => {
    if (status === "idle") dispatch(fetchRequests());
  }, [dispatch, status]);

  // 🔍 Filter logic
  const filteredRows = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    if (!searchQuery) return rows;

    const query = searchQuery.toLowerCase();

    return rows.filter((row) => {
      if (searchField === "id") return row.id.toString().includes(query);
      if (searchField === "uuid") return row.uuid?.toLowerCase().includes(query);
      if (searchField === "userReference")
        return row.userReference?.toLowerCase().includes(query);
      return (
        row.id.toString().includes(query) ||
        row.uuid?.toLowerCase().includes(query) ||
        row.userReference?.toLowerCase().includes(query)
      );
    });
  }, [rows, searchQuery, searchField]);

  // 🧭 Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
    setPage(0);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setPage(0);
  };
  const handleRefresh = () => dispatch(fetchRequests());

  const handleChangePage = (e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // 🟢 Score color logic
  const getScoreColor = (score) => {
    const num = parseFloat(score);
    if (num >= 0.9) return theme.palette.success.main;
    if (num >= 0.8) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const renderScoreChip = (score) => (
    <Chip
      label={`${(parseFloat(score) * 100).toFixed(1)}%`}
      size="small"
      sx={{
        backgroundColor: `${getScoreColor(score)}14`,
        color: getScoreColor(score),
        fontWeight: 600,
        minWidth: 70,
      }}
    />
  );

  const formatTimestamp = (value) => {
    if (!value) return "";
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const renderActions = (row) => (
    <Tooltip title="View Details">
      <IconButton
        size="small"
        onClick={() => console.log("View details for:", row.id)}
        sx={{
          color: theme.palette.primary.main,
          "&:hover": { backgroundColor: `${theme.palette.primary.main}14` },
        }}
      >
        <Visibility />
      </IconButton>
    </Tooltip>
  );

  // 🧱 Responsive columns
  const getVisibleColumns = () => {
    if (isMobile)
      return [
        { id: "id", label: "ID", minWidth: 50 },
        { id: "userReference", label: "User Ref", minWidth: 100 },
        { id: "idCardScore", label: "ID Score", minWidth: 100, format: renderScoreChip },
        { id: "actions", label: "Actions", minWidth: 50, format: (_, row) => renderActions(row) },
      ];

    if (isTablet)
      return [
        { id: "id", label: "ID", minWidth: 50 },
        { id: "userReference", label: "User Ref", minWidth: 120 },
        { id: "ecToFaceScore", label: "EC Score", minWidth: 100, format: renderScoreChip },
        { id: "idCardScore", label: "ID Score", minWidth: 100, format: renderScoreChip },
        { id: "timestamp", label: "Time", minWidth: 120, format: formatTimestamp },
        { id: "actions", label: "Actions", minWidth: 50, format: (_, row) => renderActions(row) },
      ];

    return [
      { id: "id", label: "ID", minWidth: 50 },
      { id: "uuid", label: "UUID", minWidth: 150 },
      { id: "userReference", label: "User Reference", minWidth: 120 },
      { id: "ecToFaceScore", label: "EC→Face", minWidth: 130, format: renderScoreChip },
      { id: "idToFaceScore", label: "ID→Face", minWidth: 130, format: renderScoreChip },
      { id: "fatherNameScore", label: "Father's Name", minWidth: 150, format: renderScoreChip },
      { id: "motherNameScore", label: "Mother's Name", minWidth: 150, format: renderScoreChip },
      { id: "nameBnScore", label: "Name (BN)", minWidth: 130, format: renderScoreChip },
      { id: "dobScore", label: "DOB", minWidth: 100, format: renderScoreChip },
      { id: "idCardScore", label: "ID Card", minWidth: 120, format: renderScoreChip },
      { id: "timestamp", label: "Timestamp", minWidth: 160, format: formatTimestamp },
      { id: "actions", label: "Actions", minWidth: 80, format: (_, row) => renderActions(row) },
    ];
  };

  const visibleColumns = getVisibleColumns();

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      {/* 🔹 Header */}
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontWeight: 600,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
        }}
      >
        <Visibility sx={{ fontSize: { xs: 24, sm: 28 } }} />
        Request List
      </Typography>

      {/* 🔍 Search Controls */}
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
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              fullWidth
              placeholder="Search requests..."
              value={searchQuery}
              onChange={handleSearchChange}
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
                    <IconButton size="small" onClick={clearSearch} aria-label="Clear search">
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

          <Grid item xs={12} sm={6} md={4}>
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
              <Select value={searchField} onChange={handleSearchFieldChange} displayEmpty>
                <MenuItem value="all">All Fields</MenuItem>
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="uuid">UUID</MenuItem>
                <MenuItem value="userReference">User Reference</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 2,
            color: "text.secondary",
            fontSize: "0.875rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {filteredRows.length} {filteredRows.length === 1 ? "result" : "results"} found
            {searchQuery && (
              <Typography component="span" sx={{ ml: 1, fontStyle: "italic" }}>
                for "{searchQuery}"
              </Typography>
            )}
          </div>

          <Tooltip title="Refresh data">
            <IconButton
              size="small"
              onClick={handleRefresh}
              disabled={status === "loading"}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": { backgroundColor: `${theme.palette.primary.main}14` },
              }}
            >
              {status === "loading" ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <RefreshIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* ⚠️ Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load requests: {error}
        </Alert>
      )}

      {/* 🧾 Table */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: { xs: "calc(100vh - 350px)", sm: 600 },
            "&::-webkit-scrollbar": { width: 8, height: 8 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "divider",
              borderRadius: 4,
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {visibleColumns.map((col) => (
                  <TableCell
                    key={col.id}
                    align="center"
                    sx={{
                      minWidth: col.minWidth,
                      backgroundColor: "background.default",
                      fontWeight: 600,
                      color: "text.primary",
                      borderBottom: "2px solid",
                      borderColor: "divider",
                      py: 2,
                      whiteSpace: "nowrap",
                      px: { xs: 1, sm: 2 },
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {status === "loading" && !rows?.length ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={40} color="primary" />
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                      Loading requests...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        "&:hover": { backgroundColor: `${theme.palette.primary.main}08` },
                        cursor: "pointer",
                      }}
                    >
                      {visibleColumns.map((col) => {
                        const value = row[col.id];
                        return (
                          <TableCell
                            key={col.id}
                            align="center"
                            sx={{
                              borderBottom: "1px solid",
                              borderColor: "divider",
                              px: { xs: 1, sm: 2 },
                              py: { xs: 1.5, sm: 2 },
                            }}
                          >
                            {col.format ? col.format(value, row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No matching requests found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 📄 Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.default",
          }}
        />
      </Paper>
    </Box>
  );
};

export default RequestListPage;
