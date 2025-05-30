import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ForgotPasswordService } from '../services/cognito/forgot-password.service';
import { GetCurrentAuthUserService } from '../services/cognito/get-current-auth-user.service';
import { ResetPasswordService } from '../services/cognito/reset-password.service';
import { SignInService } from '../services/cognito/sign-in.service';
import { SignOutService } from '../services/cognito/sign-out.service';
import { ResetPasswordSubmitParams } from '../services/cognito/types/auth';

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
  forgotPassword: (email: string) => void;
  resetPassword: (data: ResetPasswordSubmitParams) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: UserLogin): Promise<void> => {
    setLoading(true);
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
      navigate('/dashboard');
    } catch (err) {
      setIsAuthenticated(false);
      handleError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await SignOutService.signOut();
      setUser(null);
      setIsAuthenticated(false);
      navigate('/signin');
    } catch (err) {
      handleError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await ForgotPasswordService.sendResetCode(email);
      toast.success('Solicitação realizada', {
        description: 'Verifique seu e-mail para redefinir sua senha',
      });
      navigate('/reset-password');
    } catch (err) {
      handleError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    data: ResetPasswordSubmitParams
  ): Promise<void> => {
    setLoading(true);
    try {
      await ResetPasswordService.confirmResetPassword(data);
      navigate('/signin');
      toast.success('Senha atualizada com sucesso', {
        description: 'Você pode fazer login agora',
      });
    } catch (err) {
      handleError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message: string) => {
    toast.error('Oops, algo deu errado', {
      description: message,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        forgotPassword,
        resetPassword,
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
