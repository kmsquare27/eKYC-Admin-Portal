import React from "react";
import { Typography, Alert } from "@mui/material";

const ConfigIntro = () => (
  <>
    <Typography variant="body1" paragraph>
      Configure the minimum threshold percentage required for various matching
      criteria. These thresholds determine when a match is considered valid
      during the verification process.
    </Typography>

    <Alert severity="info" sx={{ mb: 3 }}>
      Setting thresholds too high may increase false negatives (legitimate
      users being rejected). Setting them too low may increase false positives
      (unauthorized access).
    </Alert>
  </>
);

export default ConfigIntro;
