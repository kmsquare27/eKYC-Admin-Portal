import React from 'react';  
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useThemeMode } from '../theme/ThemeContext';

const drawerWidth = 268;

const AppBar = ({ open, onDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
        ml: { sm: open ? `${drawerWidth}px` : 0 },
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: 180, 
        }),
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar
        sx={{
          pr: { xs: 1, sm: 3 },
          pl: { xs: 1, sm: 2 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{
            mr: 2,
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: `${theme.palette.primary.main}14`,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            color: 'text.primary',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 600,
          }}
        >
          {isMobile ? 'Admin Portal' : 'eKYC Admin Portal'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton
              onClick={toggleMode}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}14`,
                },
              }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}14`,
                },
              }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
