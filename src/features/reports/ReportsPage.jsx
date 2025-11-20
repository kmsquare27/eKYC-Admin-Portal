import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../store/slices/requestsSlice";
import { Box, Alert, useTheme, useMediaQuery } from "@mui/material";
import RequestListHeader from "../requestList/components/RequestListHeader";
import ReportsFilterForm from "./components/ReportsFilterForm";
import ReportsTable from "./components/ReportsTable";
import RequestListPagination from "../requestList/components/RequestListPagination";
import { getVisibleColumns } from "../requestList/utils/columnsConfig";
import { Assessment } from "@mui/icons-material";

const ReportsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { items: rows, status, error } = useSelector((s) => s.requests);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filter states
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [requestType, setRequestType] = useState("all");

  useEffect(() => {
    if (status === "idle") dispatch(fetchRequests());
  }, [dispatch, status]);

  // Filter logic
  const filteredRows = useMemo(() => {
    if (!rows) return [];
    
    let filtered = [...rows];

    // Date filtering
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter((r) => {
        const rowDate = new Date(r.timestamp);
        return rowDate >= fromDate;
      });
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((r) => {
        const rowDate = new Date(r.timestamp);
        return rowDate <= toDate;
      });
    }

    // Request type filtering
    if (requestType === "pending") {
      filtered = filtered.filter((r) => {
        // Assuming pending means scores below threshold (e.g., < 0.8)
        const avgScore = (
          parseFloat(r.idCardScore || 0) +
          parseFloat(r.ecToFaceScore || 0) +
          parseFloat(r.idToFaceScore || 0)
        ) / 3;
        return avgScore >= 0.7 && avgScore < 0.9;
      });
    } else if (requestType === "failed") {
      filtered = filtered.filter((r) => {
        // Failed means scores below 0.7
        const avgScore = (
          parseFloat(r.idCardScore || 0) +
          parseFloat(r.ecToFaceScore || 0) +
          parseFloat(r.idToFaceScore || 0)
        ) / 3;
        return avgScore < 0.7;
      });
    }

    return filtered;
  }, [rows, dateFrom, dateTo, requestType]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleReset = () => {
    setDateFrom(null);
    setDateTo(null);
    setRequestType("all");
    setPage(0);
  };

  const reportsColumns = [
  {
    id: "sl",
    label: "ID",
    minWidth: 60,
    format: (value, row) => row.sl || "-", 
  },
  {
    id: "nameBn",
    label: "Name (BN)",
    minWidth: 150,
    format: (value) => value || "—",
  },
  {
    id: "dob",
    label: "DOB",
    minWidth: 120,
    format: (value) => value || "—",
  },
  {
    id: "idCardScore",
    label: "ID Card",
    minWidth: 120,
    format: (value) => {
      if (!value) return "—";
      const score = parseFloat(value) * 100;
      return `${score.toFixed(1)}%`;
    },
  },
];

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <RequestListHeader 
        title="Activity Reports" 
        color={theme.palette.primary.main}
      />

      <ReportsFilterForm
        dateFrom={dateFrom}
        dateTo={dateTo}
        requestType={requestType}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onRequestTypeChange={setRequestType}
        onReset={handleReset}
        onRefresh={() => dispatch(fetchRequests())}
        loading={status === "loading"}
        resultCount={filteredRows.length}
        filteredData={paginatedRows}
        theme={theme}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load requests: {error}
        </Alert>
      )}

      <ReportsTable
        rows={paginatedRows}
        visibleColumns={reportsColumns}
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

export default ReportsPage;