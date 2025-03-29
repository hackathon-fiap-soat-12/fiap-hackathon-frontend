import { useAuth } from '@/core/context/auth-context';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from './sign-in-form/sign-in-form';

export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: 'Usuário', email: 'Abcd' });
    navigate('/app/dashboard');
  };

  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <SignInForm />
    </div>
  );
}
