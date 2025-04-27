'use client';

import { AppBar, Box, Toolbar, Typography, IconButton, Switch, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from './ThemeRegistry';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { mode, toggleMode } = useThemeMode();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();           // Limpa o token no context
    router.push('/login');  // Redireciona para login
  };

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar className="flex justify-between">
        <Box className="flex items-center space-x-2">
          <Typography variant="h6" component="div">
            Pharmastock
          </Typography>
        </Box>

        <Box className="flex items-center space-x-4">
          {/* Switch Dark/Light Mode */}
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Botão Logout */}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
