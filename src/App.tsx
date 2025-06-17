import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Dashboard } from './pages/Dashboard';

// Define the MUI theme with custom palette and typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A standard blue for primary actions
    },
    secondary: {
      main: '#9c27b0', // A purple for secondary actions
    },
    background: {
      default: '#f5f5f5', // Light grey background
      paper: '#ffffff',   // White for cards and dialogs
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Standard Material-UI font
    h4: {
      fontWeight: 600, // Bolder for main titles
    },
    h6: {
      fontWeight: 500, // Slightly bolder for section titles
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)', // Lift and shadow on hover
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep button text as is (not all caps)
          borderRadius: 8,       // Slightly more rounded buttons
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets browser default styles and provides dark/light mode */}
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;