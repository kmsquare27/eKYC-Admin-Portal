import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { useThemeMode } from "../../app/theme/ThemeContext";

export default function LoginPage() {
  const { mode } = useThemeMode();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: mode === "light" ? "#f3f4f6" : "#0f172a",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          backgroundColor: mode === "light" ? "#fff" : "#1e293b",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, fontWeight: 600 }}
        >
          eKYC Admin Login
        </Typography>

        <LoginForm />
      </Paper>
    </Box>
  );
}
