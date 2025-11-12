import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Slider,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";

const ThresholdSlider = ({
  label,
  value,
  onChange,
  icon: Icon,
  description,
  disabled,
}) => {
  const theme = useTheme();

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      onChange(newValue);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${theme.palette.primary.main}14`,
              borderRadius: "12px",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <Icon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
        </Box>

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}

        {/* Slider + Number Input */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} sm={9}>
            <Slider
              value={value}
              onChange={(_, newValue) => onChange(newValue)}
              aria-labelledby={`${label}-slider`}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={100}
              disabled={disabled}
              sx={{
                color: theme.palette.primary.main,
                "& .MuiSlider-thumb": { width: 16, height: 16 },
              }}
            />
          </Grid>
          <Grid item xs={4} sm={3}>
            <TextField
              value={value}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
              inputProps={{ min: 0, max: 100, type: "number" }}
              variant="outlined"
              size="small"
              fullWidth
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ThresholdSlider;
