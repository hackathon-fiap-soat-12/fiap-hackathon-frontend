import { useAuth } from '@/core/context/auth-context';
import { AuthLayout } from '@/core/layouts/AuthLayout';
import BaseLayout from '@/core/layouts/BaseLayout';
import { Dashboard } from '@/modules/admin/pages/dashboard/dashboard';
import { ConfirmEmailResend } from '@/modules/auth/pages/confirm-email-resend/confirm-email-resend';
import { ConfirmEmail } from '@/modules/auth/pages/confirm-email/confirm-email';
import { ForgotPassword } from '@/modules/auth/pages/reset-password/forgot-password';
import { SignIn } from '@/modules/auth/pages/sign-in/sign-in';
import { SignUp } from '@/modules/auth/pages/sign-up/sign-up';
import { Error404 } from '@/modules/errors/error-404/error-404';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

interface ProtectedRouteProps {
  isPrivate?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isPrivate }) => {
  const { isAuthenticated } = useAuth();

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirm" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route
            path="/confirm-email-resend"
            element={<ConfirmEmailResend />}
          />
        </Route>
      </Route>

      {/* Rotas privadas */}
      <Route element={<ProtectedRoute isPrivate />}>
        <Route path="*" element={<Error404 />} />
      </Route>
      {/* temporariamente */}
      <Route element={<BaseLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
