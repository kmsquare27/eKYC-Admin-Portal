import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Download as DownloadIcon,
  TableChart as ExcelIcon,
  Description as CsvIcon,
  PictureAsPdf as PdfIcon,
} from "@mui/icons-material";
import { formatTimestamp } from "../../requestList/utils/columnsConfig";

const ExportButton = ({ data, theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "ID",
      "UUID",
      "User Reference",
      "EC→Face Score",
      "ID→Face Score",
      "Father's Name Score",
      "Mother's Name Score",
      "Name (BN) Score",
      "DOB Score",
      "ID Card Score",
      "Timestamp",
    ];

    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        [
          row.id,
          row.uuid,
          row.userReference,
          (parseFloat(row.ecToFaceScore) * 100).toFixed(1) + "%",
          (parseFloat(row.idToFaceScore) * 100).toFixed(1) + "%",
          (parseFloat(row.fatherNameScore) * 100).toFixed(1) + "%",
          (parseFloat(row.motherNameScore) * 100).toFixed(1) + "%",
          (parseFloat(row.nameBnScore) * 100).toFixed(1) + "%",
          (parseFloat(row.dobScore) * 100).toFixed(1) + "%",
          (parseFloat(row.idCardScore) * 100).toFixed(1) + "%",
          formatTimestamp(row.timestamp),
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `activity_report_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleClose();
  };

  // Export to Excel (HTML table format)
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "ID",
      "UUID",
      "User Reference",
      "EC→Face Score",
      "ID→Face Score",
      "Father's Name Score",
      "Mother's Name Score",
      "Name (BN) Score",
      "DOB Score",
      "ID Card Score",
      "Timestamp",
    ];

    let tableHTML = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${headers.map((h) => `<th>${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row) => `
                <tr>
                  <td>${row.id}</td>
                  <td>${row.uuid}</td>
                  <td>${row.userReference}</td>
                  <td>${(parseFloat(row.ecToFaceScore) * 100).toFixed(1)}%</td>
                  <td>${(parseFloat(row.idToFaceScore) * 100).toFixed(1)}%</td>
                  <td>${(parseFloat(row.fatherNameScore) * 100).toFixed(1)}%</td>
                  <td>${(parseFloat(row.motherNameScore) * 100).toFixed(1)}%</td>
                  <td>${(parseFloat(row.nameBnScore) * 100).toFixed(1)}%</td>
                  <td>${(parseFloat(row.dobScore) * 100).toFixed(1)}%</td>
                  <td>${(parseFloat(row.idCardScore) * 100).toFixed(1)}%</td>
                  <td>${formatTimestamp(row.timestamp)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHTML], {
      type: "application/vnd.ms-excel",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `activity_report_${Date.now()}.xls`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleClose();
  };

  // Export to JSON
  const exportToJSON = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `activity_report_${Date.now()}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleClose();
  };

  return (
    <>
      <Tooltip title="Export Report">
        <Button
          variant="contained"
          size="small"
          onClick={handleClick}
          startIcon={<DownloadIcon />}
          disabled={!data || data.length === 0}
          sx={{
            borderRadius: 1.5,
            textTransform: "none",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&:disabled": {
              backgroundColor: "action.disabledBackground",
            },
          }}
        >
          Export
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
            mt: 0.5,
            minWidth: 180,
          },
        }}
      >
        <MenuItem onClick={exportToCSV}>
          <ListItemIcon>
            <CsvIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>

        <MenuItem onClick={exportToExcel}>
          <ListItemIcon>
            <ExcelIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>Export as Excel</ListItemText>
        </MenuItem>

        <MenuItem onClick={exportToJSON}>
          <ListItemIcon>
            <PdfIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Export as JSON</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExportButton;