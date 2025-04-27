// src/lib/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // ou 'dark'
    primary: {
      main: '#1976d2', // Azul padrão MUI
    },
    secondary: {
      main: '#9c27b0', // Roxo padrão MUI
    },
  },
});

export default theme;
