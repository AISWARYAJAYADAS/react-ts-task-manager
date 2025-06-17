// This file becomes simpler as theming is handled by ThemeContext
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    // CssBaseline and ThemeProvider are now managed within CustomThemeProvider in ThemeContext
    <Dashboard />
  );
}

export default App;