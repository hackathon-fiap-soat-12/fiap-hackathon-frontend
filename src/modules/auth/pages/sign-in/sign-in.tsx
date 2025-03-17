import { useAuth } from '@/core/hooks/use-auth.hook';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './sign-in-form/sign-in-form';

export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: 'Usuário' });
    navigate('/app/dashboard');
  };

  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <LoginForm />
    </div>
  );
}
