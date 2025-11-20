import React, { useState, useMemo, useEffect } from 'react';
import LoginPage from "../features/auth/LoginPage";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

import Sidebar from './layout/Sidebar';
import AppBar from './layout/AppBar';
import DashboardPage from '../features/dashboard/DashboardPage';
import RequestListPage from '../features/requestList/RequestListPage';
import ConfigurationsPage from '../features/configurations/ConfigurationsPage';
import { useThemeMode } from './theme/ThemeContext';
import ReportsPage from "../features/reports/ReportsPage";

const drawerWidth = 250;

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { mode } = useThemeMode();
  const location = useLocation();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#3b82f6', // Tailwind blue-500
        light: '#60a5fa', // Tailwind blue-400
        dark: '#2563eb', // Tailwind blue-600
      },
      secondary: {
        main: '#f59e0b', // Tailwind amber-500
        light: '#fbbf24', // Tailwind amber-400
        dark: '#d97706', // Tailwind amber-600
      },
      background: {
        default: mode === 'light' ? '#f9fafb' : '#111827', // Tailwind gray-50 : gray-900
        paper: mode === 'light' ? '#ffffff' : '#1f2937', // Tailwind white : gray-800
      },
      text: {
        primary: mode === 'light' ? '#1f2937' : '#f9fafb', // Tailwind gray-800 : gray-50
        secondary: mode === 'light' ? '#4b5563' : '#9ca3af', // Tailwind gray-600 : gray-400
      },
      error: {
        main: '#ef4444', // Tailwind red-500
      },
      warning: {
        main: '#f59e0b', // Tailwind amber-500
      },
      info: {
        main: '#3b82f6', // Tailwind blue-500
      },
      success: {
        main: '#10b981', // Tailwind emerald-500
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      },
    },
  }), [mode]);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Close drawer by default on mobile
  React.useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

 return (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />

    {/* Detect current route */}
    {location.pathname.startsWith("/login") ? (
      // ============================
      // LOGIN PAGE (NO APPBAR/SIDEBAR)
      // ============================
      <LoginPage />
    ) : (
      // ============================
      // AUTHENTICATED LAYOUT
      // ============================
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar open={drawerOpen} onDrawerToggle={handleDrawerToggle} />
        <Sidebar open={drawerOpen} onDrawerToggle={handleDrawerToggle} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: { xs: 7, sm: 8 },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Routes>
            {/* DEFAULT */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* LOGIN ROUTE WITH REDIRECT IF ALREADY AUTH */}
            <Route
              path="/login"
              element={
                isAuth ? <Navigate to="/dashboard" replace /> : <LoginPage />
              }
            />

            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard"
              element={isAuth ? <DashboardPage /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/requests"
              element={isAuth ? <RequestListPage /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/configurations"
              element={isAuth ? <ConfigurationsPage /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/reports"
              element={isAuth ? <ReportsPage /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </Box>
      </Box>
    )}
  </MuiThemeProvider>
);
}

export default App;