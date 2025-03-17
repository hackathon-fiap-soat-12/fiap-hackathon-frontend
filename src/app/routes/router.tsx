import { Layout } from '@/core/components/ui/layout';
import { Error404 } from '@/modules/errors/error-404/error-404';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
