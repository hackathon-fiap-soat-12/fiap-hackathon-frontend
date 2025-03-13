import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './public-routes';
import PrivateRoutes from './private-routes';
import Error404 from '@/modules/errors/error-404/error-404';
import { Layout } from '@/core/components/ui/layout';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
      </Route>
      <Route path="*" element={<Error404 />} /> {/* Rota 404 */}
    </Routes>
  );
}
