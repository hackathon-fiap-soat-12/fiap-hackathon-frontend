import { useAuth } from '@/core/context/auth-context';
import { AuthLayout } from '@/core/layouts/AuthLayout';
import BaseLayout from '@/core/layouts/BaseLayout';
import { Dashboard } from '@/modules/admin/pages/dashboard/dashboard';
import Home from '@/modules/admin/pages/home/home';
import { ConfirmEmailResend } from '@/modules/auth/pages/confirm-email-resend/confirm-email-resend';
import { ConfirmEmail } from '@/modules/auth/pages/confirm-email/confirm-email';
import { ForgotPassword } from '@/modules/auth/pages/forgot-password/forgot-password';
import { ResetPassword } from '@/modules/auth/pages/reset-password/reset-password';
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
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route
            path="/confirm-email-resend"
            element={<ConfirmEmailResend />}
          />
        </Route>
      </Route>

      <Route element={<ProtectedRoute isPrivate />}>
        <Route element={<BaseLayout />}>
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
