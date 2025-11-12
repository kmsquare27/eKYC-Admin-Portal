import React from "react";
import { Box } from "@mui/material";
import {
  Face,
  CompareArrows,
  Person,
  Translate,
  CalendarMonth,
  Badge,
} from "@mui/icons-material";
import ThresholdSlider from "./ThresholdSlider";

const ConfigThresholdList = ({ thresholds, onChange, disabled }) => (
  <Box sx={{ mb: 4 }}>
    <ThresholdSlider
      label="EC to Face Match"
      value={thresholds.ecToFaceMatch || 0}
      onChange={(v) => onChange("ecToFaceMatch", v)}
      icon={Face}
      description="Minimum similarity required between EC photo and user's face"
      disabled={disabled}
    />
    <ThresholdSlider
      label="ID to Face Match"
      value={thresholds.idToFaceMatch || 0}
      onChange={(v) => onChange("idToFaceMatch", v)}
      icon={CompareArrows}
      description="Minimum similarity required between ID photo and user's face"
      disabled={disabled}
    />
    <ThresholdSlider
      label="Father Name Matching"
      value={thresholds.fatherNameMatching || 0}
      onChange={(v) => onChange("fatherNameMatching", v)}
      icon={Person}
      description="Minimum similarity required for father's name verification"
      disabled={disabled}
    />
    <ThresholdSlider
      label="Mother Name Matching"
      value={thresholds.motherNameMatching || 0}
      onChange={(v) => onChange("motherNameMatching", v)}
      icon={Person}
      description="Minimum similarity required for mother's name verification"
      disabled={disabled}
    />
    <ThresholdSlider
      label="Name (Bangla) Matching"
      value={thresholds.nameBanglaMatching || 0}
      onChange={(v) => onChange("nameBanglaMatching", v)}
      icon={Translate}
      description="Minimum similarity required for Bangla name verification"
      disabled={disabled}
    />
    <ThresholdSlider
      label="Name (English) Matching"
      value={thresholds.nameEnglishMatching || 0}
      onChange={(v) => onChange("nameEnglishMatching", v)}
      icon={Translate}
      description="Minimum similarity required for English name verification"
      disabled={disabled}
    />
    <ThresholdSlider
      label="Date of Birth Matching"
      value={thresholds.dateOfBirthMatching || 0}
      onChange={(v) => onChange("dateOfBirthMatching", v)}
      icon={CalendarMonth}
      description="Minimum similarity required for date of birth verification"
      disabled={disabled}
    />
    <ThresholdSlider
      label="ID Card Matching"
      value={thresholds.idCardMatching || 0}
      onChange={(v) => onChange("idCardMatching", v)}
      icon={Badge}
      description="Minimum similarity required for ID card verification"
      disabled={disabled}
    />
  </Box>
);

export default ConfigThresholdList;
