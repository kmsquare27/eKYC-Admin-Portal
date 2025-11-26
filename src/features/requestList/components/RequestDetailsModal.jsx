import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InfoRow = ({ label, value, status }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1.5,
      borderBottom: "1px solid #eee",
    }}
  >
    {/* Left: Label */}
    <Typography sx={{ fontWeight: 600, width: "30%" }}>{label}</Typography>

    {/* Middle: Value */}
    <Typography sx={{ width: "40%", textAlign: "left" }}>
      {value ?? "--"}
    </Typography>

    {/* Right: Status Chip */}
    <Box sx={{ width: "20%", textAlign: "right" }}>
      {status !== undefined && (
        <Chip
          label={status ? "Pass" : "Fail"}
          sx={{
            bgcolor: status ? "#e8f5e9" : "#ffebee",
            color: status ? "#2e7d32" : "#d32f2f",
            fontWeight: 600,
          }}
        />
      )}
    </Box>
  </Box>
);

const RequestDetailsModal = ({ open, onClose, row }) => {
  if (!row) return null;

  const scoreStatus = (score) => {
    const s = parseFloat(score);
    return isNaN(s) ? undefined : s >= 0.85;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: { xs: "95%", sm: "80%", md: "60%" },
          mx: "auto",
          mt: 6,
          borderRadius: 2,
          p: 3,
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            eKYC Verification Details
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Remarks */}
        <Box
          sx={{
            bgcolor: "#bc8888ff",
            p: 2,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography variant="body1">
            <strong>Remarks:</strong> Ekyc is in pending state. Please wait!
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Details List */}
        <Stack spacing={1}>
          <InfoRow label="UUID" value={row.uuid} />
          <InfoRow label="User Reference" value={row.userReference} />
          <InfoRow
            label="EC → Face Score"
            value={row.ecToFaceScore}
            status={scoreStatus(row.ecToFaceScore)}
          />
          <InfoRow
            label="ID → Face Score"
            value={row.idToFaceScore}
            status={scoreStatus(row.idToFaceScore)}
          />
          <InfoRow
            label="Father Name Score"
            value={row.fatherNameScore}
            status={scoreStatus(row.fatherNameScore)}
          />
          <InfoRow
            label="Mother Name Score"
            value={row.motherNameScore}
            status={scoreStatus(row.motherNameScore)}
          />
          <InfoRow
            label="Bangla Name Score"
            value={row.nameBnScore}
            status={scoreStatus(row.nameBnScore)}
          />
          <InfoRow
            label="DOB Score"
            value={row.dobScore}
            status={scoreStatus(row.dobScore)}
          />
          <InfoRow
            label="ID Card Score"
            value={row.idCardScore}
            status={scoreStatus(row.idCardScore)}
          />
          <InfoRow
            label="Timestamp"
            value={row.timestamp?.toLocaleString("en-GB")}
          />
        </Stack>

        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Typography
            onClick={onClose}
            sx={{
              cursor: "pointer",
              color: "primary.main",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Close
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default RequestDetailsModal;
