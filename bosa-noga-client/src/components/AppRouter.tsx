import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from '../routes';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, component: Component }) =>
        <Route key={path} path={path} element={<Component />} />
      )}
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  )
}

export default AppRouter
