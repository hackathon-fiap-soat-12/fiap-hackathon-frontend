import { useAuth } from '@/core/hooks/use-auth.hook';
import { Navigate, Outlet, Routes, Route } from 'react-router-dom';

export default function PrivateRoutes() {
  const { user } = useAuth();

  return user ? (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/dashboard" element={<></>} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/signin" replace />
  );
}
