import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { useThemeMode } from "../../app/theme/ThemeContext";

export default function LoginPage() {
  const { mode } = useThemeMode();

  const isLight = mode === "light";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isLight
          ? "linear-gradient(135deg, #eef2ff, #dbeafe, #bfdbfe)"
          : "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
        animation: "gradientShift 12s ease infinite",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          background: isLight
            ? "rgba(147,197,253,0.25)"
            : "rgba(96,165,250,0.15)",
          borderRadius: "50%",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: 420,
          p: 5,
          backdropFilter: "blur(18px)",
          backgroundColor: isLight
            ? "rgba(255,255,255,0.8)"
            : "rgba(30,41,59,0.6)",
          borderRadius: "20px",
          boxShadow: isLight
            ? "0 8px 30px rgba(0,0,0,0.08)"
            : "0 8px 30px rgba(0,0,0,0.35)",
          border: isLight
            ? "1px solid rgba(255,255,255,0.7)"
            : "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 2,
          animation: "slideUp 0.8s ease",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/eKYC_logo.svg"
          alt="Logo"
          sx={{
            width: 60,
            height: 60,
            objectFit: "contain",
            display: "block",
            mx: "auto",
            mb: 2,
            filter: isLight ? "none" : "brightness(0) invert(1)",
          }}
        />

        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: isLight ? "#1e293b" : "#f1f5f9",
            letterSpacing: "0.5px",
          }}
        >
          eKYC Admin Portal
        </Typography>

        <Typography
          align="center"
          sx={{
            mb: 4,
            color: isLight ? "#475569" : "#94a3b8",
            fontSize: "0.9rem",
          }}
        >
        </Typography>

        <LoginForm />
      </Paper>

      {/* Keyframes */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </Box>
  );
}
