import { Routes, Route } from 'react-router-dom';
import publicRoutes, { PublicRoute } from '../routes';
import NotFoundPage from '../pages/NotFoundPage.tsx';

const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({ path, component: Component }: PublicRoute) => (
      <Route key={path} path={path} element={<Component />} />
    ))
    }
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
