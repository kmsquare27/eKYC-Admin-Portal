import { Chip, IconButton, Tooltip } from "@mui/material";
import { Visibility } from "@mui/icons-material";

/**
 * Returns color depending on score.
 */
const getScoreColor = (score, theme) => {
  const num = parseFloat(score);
  if (num >= 0.9) return theme.palette.success.main;
  if (num >= 0.8) return theme.palette.warning.main;
  return theme.palette.error.main;
};

/**
 * Renders percentage chip.
 */
export const renderScoreChip = (score, theme) => (
  <Chip
    label={`${(parseFloat(score) * 100).toFixed(1)}%`}
    size="small"
    sx={{
      backgroundColor: `${getScoreColor(score, theme)}14`,
      color: getScoreColor(score, theme),
      fontWeight: 600,
      minWidth: 70,
    }}
  />
);

/**
 * Formats date.
 */
export const formatTimestamp = (value) => {
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

/**
 * Renders action icons for each row.
 */
export const renderActions = (row, theme) => (
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

/**
 * Returns visible columns depending on screen size.
 */
export const getVisibleColumns = (isMobile, isTablet, theme) => {
  if (isMobile)
    return [
      { id: "id", label: "ID", minWidth: 50 },
      { id: "userReference", label: "User Ref", minWidth: 100 },
      { id: "idCardScore", label: "ID Score", minWidth: 100, format: (v) => renderScoreChip(v, theme) },
      { id: "actions", label: "Actions", minWidth: 50, format: (_, r) => renderActions(r, theme) },
    ];

  if (isTablet)
    return [
      { id: "id", label: "ID", minWidth: 50 },
      { id: "userReference", label: "User Ref", minWidth: 120 },
      { id: "ecToFaceScore", label: "EC Score", minWidth: 100, format: (v) => renderScoreChip(v, theme) },
      { id: "idCardScore", label: "ID Score", minWidth: 100, format: (v) => renderScoreChip(v, theme) },
      { id: "timestamp", label: "Time", minWidth: 120, format: formatTimestamp },
      { id: "actions", label: "Actions", minWidth: 50, format: (_, r) => renderActions(r, theme) },
    ];

  // 💻 Desktop full view
  return [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "uuid", label: "UUID", minWidth: 150 },
    { id: "userReference", label: "User Reference", minWidth: 120 },
    { id: "ecToFaceScore", label: "EC→Face", minWidth: 130, format: (v) => renderScoreChip(v, theme) },
    { id: "idToFaceScore", label: "ID→Face", minWidth: 130, format: (v) => renderScoreChip(v, theme) },
    { id: "fatherNameScore", label: "Father's Name", minWidth: 150, format: (v) => renderScoreChip(v, theme) },
    { id: "motherNameScore", label: "Mother's Name", minWidth: 150, format: (v) => renderScoreChip(v, theme) },
    { id: "nameBnScore", label: "Name (BN)", minWidth: 130, format: (v) => renderScoreChip(v, theme) },
    { id: "dobScore", label: "DOB", minWidth: 100, format: (v) => renderScoreChip(v, theme) },
    { id: "idCardScore", label: "ID Card", minWidth: 120, format: (v) => renderScoreChip(v, theme) },
    { id: "timestamp", label: "Timestamp", minWidth: 160, format: formatTimestamp },
    { id: "actions", label: "Actions", minWidth: 80, format: (_, r) => renderActions(r, theme) },
  ];
};
