'use client';

import { ReactNode, useState, useMemo, createContext, useContext, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '@/lib/createEmotionCache';
import { CacheProvider } from '@emotion/react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useThemeMode must be used inside ThemeRegistry');
  return context;
};

const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Primeiro: ler do localStorage quando a página carrega
  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  // Depois: aplicar classe `dark` no HTML sempre que mudar o modo
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', mode === 'dark');
      document.documentElement.style.setProperty('--background-light', mode === 'light' ? '#f5f5f5' : '#121212');
      document.documentElement.style.setProperty('--foreground-light', mode === 'light' ? '#171717' : '#ededed');
    }
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        background: {
          default: mode === 'light' ? '#f5f5f5' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        },
      },
    });
  }, [mode]);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeModeContext.Provider value={{ mode, toggleMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </CacheProvider>
  );
}
