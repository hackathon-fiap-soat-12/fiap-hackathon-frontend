import { useAuth } from '@/core/hooks/use-auth.hook';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: 'Usuário' });
    navigate('/app/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={handleLogin}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </div>
  );
}
