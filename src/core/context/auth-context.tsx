import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetCurrentAuthUserService } from '../services/cognito/get-current-auth-user.service';
import { SignInService } from '../services/cognito/sign-in.service';
import { SignOutService } from '../services/cognito/sign-out.service';

interface User {
  name?: string;
  email: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: UserLogin) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentSession();
  }, []);

  const getCurrentSession = async () => {
    setLoading(true);
    try {
      const loggerUser = await GetCurrentAuthUserService.getCurrentAuthUser();
      setIsAuthenticated(!!loggerUser);
      setUser({
        email: loggerUser.email!,
        name: loggerUser.name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check session failed');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: UserLogin): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const loggerUser = await SignInService.signIn({
        username: loginData.email,
        password: loginData.password,
      });

      setUser({
        email: loggerUser.email!,
        name: loggerUser.name,
      });
      setIsAuthenticated(!!loggerUser);
      navigate('/home');
    } catch (err) {
      setIsAuthenticated(false);
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    await SignOutService.signOut();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/signin');
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
