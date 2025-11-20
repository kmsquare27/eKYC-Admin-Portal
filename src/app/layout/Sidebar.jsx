import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  InputBase,
} from '@mui/material';
import {
  Assessment as RequestsIcon,
  BarChart as ReportsIcon,
  BarChart,
  Settings as SettingsIcon,
  Build as ConfigIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice"; 


const drawerWidth = 250;

const Sidebar = ({ open, onDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <BarChart />,
      path: '/dashboard',
      color: theme.palette.primary.main,
    },
    {
      text: 'Requests List',
      icon: <RequestsIcon />,
      path: '/requests',
      color: theme.palette.info.main,
    },
    {
      text: 'Reports',
      icon: <ReportsIcon />,
      path: '/reports',
      color: theme.palette.info.main,
    },
    {
      text: 'Configurations',
      icon: <ConfigIcon />,
      path: '/configurations',
      color: theme.palette.warning.main,
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
      color: theme.palette.success.main,
    },
  ];

  const bottomMenuItems = [
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      path: '/logout',
      color: theme.palette.error.main,
    },
  ];

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: '#00215b',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        p: '0.3rem 1.5rem',
        boxShadow:
          '0px 3px 5px rgba(0,0,0,0.02), 0px 0px 2px rgba(0,0,0,0.05), 0px 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header + Logo */}
    <Box
      sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      py: 2,      
      height: 64,              
      }}
    >
    <Box
      component="img"
      src="/eKYC_logo.svg"
      alt="eKYC Logo"
      sx={{
      width: 50,
      height: 50,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
    }}
    />
    </Box>

    {/* Search Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '6px',
          px: 1.5,
          py: 0.5,
          mb: 2,
        }}
      >
        <SearchIcon sx={{ color: '#fff', fontSize: 18, opacity: 0.8 }} />
        <InputBase
          placeholder="Search menu..."
          sx={{
            color: '#fff',
            ml: 1,
            fontSize: '0.9rem',
            '&::placeholder': { color: 'rgba(255,255,255,0.6)' },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      {/* Main Menu Items */}
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                mb: 0.5,
                borderLeft: isActive ? '3px solid #2196F3' : '3px solid transparent',
              }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isActive}
                sx={{
                  minHeight: 48,
                  px: 2,
                  py: 0.8,
                  borderRadius: '6px',
                  color: '#fff',
                  backgroundColor: isActive
                    ? 'rgba(255,255,255,0.15)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: '#fff',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive ? 600 : 400,
                      color: '#fff',
                    },
                  }}
                />
                <ChevronRightIcon sx={{ color: 'rgba(255,255,255,0.6)' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 1 }} />

      {/* Bottom (Logout) Menu */}
      <List sx={{ py: 1 }}>
  {bottomMenuItems.map((item) => {
    const isActive = location.pathname === item.path;

    return (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          onClick={() => {
            dispatch(logout());         // CLEAR auth state
            navigate("/login");         // REDIRECT to login
          }}
          selected={isActive}
          sx={{
            minHeight: 48,
            px: 2,
            py: 0.8,
            borderRadius: "6px",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "#fff",
            }}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText
            primary={item.text}
            sx={{
              "& .MuiListItemText-primary": {
                color: "#fff",
                fontWeight: isActive ? 600 : 400,
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  })}
</List>

    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#00215b',
              color: '#fff',
              transition: 'transform 0.18s ease-out',
              transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
              willChange: 'transform',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#00215b',
              color: '#fff',
              height: '100%',
              borderRight: 'none',
              transition: 'transform 0.18s ease-out',
              transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
              willChange: 'transform',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.2) transparent',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;