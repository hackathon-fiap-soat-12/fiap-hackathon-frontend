import { useAuth } from '@/core/hooks/use-auth.hook';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

export default function PrivateRoutes() {
  const { user } = useAuth();

  return user ? (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/home" element={<>Hellow</>} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/signin" replace />
  );
}
