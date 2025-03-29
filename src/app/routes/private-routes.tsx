import { useAuth } from '@/core/context/auth-context';
import { Error404 } from '@/modules/errors/error-404/error-404';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

export default function PrivateRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <></>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/home" element={<>Hellow</>} />
        <Route path="/dashboard" element={<>Hellow</>} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
