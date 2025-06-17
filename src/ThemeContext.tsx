// src/ThemeContext.tsx
import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Import ColorModeContext and ThemeContextType from the new file
import { ColorModeContext} from './contexts/ColorModeContext';
import type { ThemeMode } from './contexts/ColorModeContext';


// Props for the theme provider component
interface CustomThemeProviderProps {
  children: ReactNode;
}

// The main theme provider component
export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  // State to manage the current theme mode, initialized from local storage
  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('themeMode') as ThemeMode) || 'light';
  });

  // Memoized function to toggle the theme mode and update local storage
  const toggleColorMode = useMemo(
    () => () => {
      setMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', newMode); // Persist the choice
        return newMode;
      });
    },
    [],
  );

  // Memoized theme creation based on the current mode
  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // Apply the current mode
          // Define your custom colors for light and dark modes
          ...(mode === 'light'
            ? {
                // Light mode palette: Brighter background, darker text
                primary: {
                  main: '#6200EE', // Deep purple
                  light: '#9e47ff',
                  dark: '#0000ba',
                  contrastText: '#fff',
                },
                secondary: {
                  main: '#03DAC6', // Teal/Aqua
                  light: '#66fff9',
                  dark: '#00a896',
                  contrastText: '#000',
                },
                error: { main: '#B00020' },
                warning: { main: '#FB8C00' },
                info: { main: '#2196F3' },
                success: { main: '#4CAF50' },
                text: {
                  primary: '#333333', // Softer black
                  secondary: '#666666', // Lighter grey
                },
                background: {
                  default: '#F8F9FA', // Off-white for overall background
                  paper: '#FFFFFF',   // Pure white for cards/dialogs
                },
              }
            : {
                // Dark mode palette: Darker background, lighter text
                primary: {
                  main: '#BB86FC', // Lighter purple for dark mode contrast
                  light: '#E3DAFF',
                  dark: '#8056C4',
                  contrastText: '#000',
                },
                secondary: {
                  main: '#03DAC6', // Same teal/aqua works well in dark mode
                  light: '#66fff9',
                  dark: '#00a896',
                  contrastText: '#000',
                },
                error: { main: '#CF6679' }, // Dark mode error color
                warning: { main: '#FFC107' },
                info: { main: '#64B5F6' },
                success: { main: '#81C784' },
                text: {
                  primary: '#E0E0E0', // Light grey for primary text
                  secondary: '#B0B0B0', // Muted light grey for secondary
                },
                background: {
                  default: '#121212', // Very dark background
                  paper: '#1E1E1E',   // Slightly lighter dark for cards
                },
              }),
        },
        typography: {
          fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
          h4: {
            fontWeight: 700,
            fontSize: '2.2rem',
          },
          h6: {
            fontWeight: 600,
            fontSize: '1.25rem',
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 400,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontWeight: 300,
          },
          button: {
            fontWeight: 600,
            textTransform: 'none',
          },
        },
        spacing: 8,
        shadows: Array(25).fill('none').map((_, i) =>
          i === 1 ? (mode === 'light' ? '0px 2px 4px rgba(0,0,0,0.05)' : '0px 2px 4px rgba(0,0,0,0.2)') :
          i === 2 ? (mode === 'light' ? '0px 4px 8px rgba(0,0,0,0.1)' : '0px 4px 8px rgba(0,0,0,0.25)') :
          i === 8 ? (mode === 'light' ? '0px 8px 16px rgba(0,0,0,0.15)' : '0px 8px 16px rgba(0,0,0,0.35)') :
          'none'
        ) as Theme['shadows'],
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: (mode === 'light' ? '0px 2px 4px rgba(0,0,0,0.05)' : '0px 2px 4px rgba(0,0,0,0.2)'),
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (mode === 'light' ? '0 8px 16px rgba(0,0,0,0.15)' : '0 8px 16px rgba(0,0,0,0.35)'),
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '8px 20px',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 6,
                fontWeight: 500,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 16,
                boxShadow: (mode === 'light' ? '0 10px 30px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.4)'),
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiContainer: {
            styleOverrides: {
              root: {
                // Add a border or distinct background to the container if desired
                // border: '1px solid rgba(0,0,0,0.05)',
                // borderRadius: 10,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};