import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, CircularProgress, Typography
} from "@mui/material";

const RequestListTable = ({
  rows, visibleColumns, status, theme, renderScoreChip, renderActions
}) => (
  <TableContainer
    sx={{
      width: "100%",
      maxWidth: "100%",
      overflowX: "auto",
      overflowY: "auto",
      maxHeight: { xs: "calc(100vh - 350px)", sm: 600 },
      "& table": { minWidth: { xs: "950px", md: "1200px" }, tableLayout: "auto" },
      "&::-webkit-scrollbar": { width: 8, height: 8 },
      "&::-webkit-scrollbar-track": { backgroundColor: "rgba(183, 181, 181, 0.46)", borderRadius: 4 },
      "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(80,143,244,0.4)", borderRadius: 4 },
      "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "rgba(80,143,244,0.6)" },
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
        ) : rows.length > 0 ? (
          rows.map((row) => (
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
);

export default RequestListTable;
