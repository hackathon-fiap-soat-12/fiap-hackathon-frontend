import { ThemeProvider } from '@/core/components/theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import AppRouter from './app/routes/router';
import { AuthProvider } from './core/context/auth-context';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
