import { ThemeProvider } from '@/core/components/theme-provider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { AppRoutes } from './app/routes/router';
import { AuthProvider } from './core/context/auth-context';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </Router>
  );
}

export default App;
