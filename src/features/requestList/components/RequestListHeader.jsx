import React from "react";
import { Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const RequestListHeader = ({ title = "Request List", color }) => (
  <Typography
    variant="h5"
    sx={{
      mb: { xs: 2, sm: 3 },
      fontWeight: 600,
      color,
      display: "flex",
      alignItems: "center",
      gap: 1,
      fontSize: { xs: "1.125rem", sm: "1.25rem" },
    }}
  >
    <Visibility sx={{ fontSize: { xs: 24, sm: 28 } }} />
    {title}
  </Typography>
);

export default RequestListHeader;
