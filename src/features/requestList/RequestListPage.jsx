import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../store/slices/requestsSlice";
import { Box, Alert, useTheme, useMediaQuery } from "@mui/material";
import RequestListHeader from "./components/RequestListHeader";
import RequestListSearchBar from "./components/RequestListSearchBar";
import RequestListTable from "./components/RequestListTable";
import RequestListPagination from "./components/RequestListPagination";
import { getVisibleColumns } from "./utils/columnsConfig";

const RequestListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { items: rows, status, error } = useSelector((s) => s.requests);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");

  useEffect(() => {
    if (status === "idle") dispatch(fetchRequests());
  }, [dispatch, status]);

  const filteredRows = useMemo(() => {
    if (!rows) return [];
    const q = searchQuery.toLowerCase();
    return rows.filter((r) =>
      searchField === "all"
        ? r.uuid?.toLowerCase().includes(q) || r.userReference?.toLowerCase().includes(q)
        : r[searchField]?.toString().toLowerCase().includes(q)
    );
  }, [rows, searchQuery, searchField]);

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const visibleColumns = getVisibleColumns(isMobile, isTablet, theme);

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <RequestListHeader color={theme.palette.primary.main} />

      <RequestListSearchBar
        searchQuery={searchQuery}
        searchField={searchField}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onFieldChange={(e) => setSearchField(e.target.value)}
        onClear={() => setSearchQuery("")}
        onRefresh={() => dispatch(fetchRequests())}
        loading={status === "loading"}
        resultCount={filteredRows.length}
        theme={theme}
      />

      {error && <Alert severity="error">Failed to load requests: {error}</Alert>}

      <RequestListTable
        rows={paginatedRows}
        visibleColumns={visibleColumns}
        status={status}
        theme={theme}
      />

      <RequestListPagination
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default RequestListPage;
