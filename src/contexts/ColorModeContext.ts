import { createContext } from 'react';

// Define the types for your theme context
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

// Create the context to be used by components to access theme mode
// Initial value matches the default in CustomThemeProvider
export const ColorModeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});