import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CustomThemeProvider } from './ThemeContext.tsx'; // Import the new theme provider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomThemeProvider> {/* Wrap App with the custom theme provider */}
      <App />
    </CustomThemeProvider>
  </StrictMode>,
);