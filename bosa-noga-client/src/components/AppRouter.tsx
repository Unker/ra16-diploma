import { Routes, Route } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import publicRoutes, { IPublicRoute } from '../routes';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import Banner from './Banner/Banner.tsx';

const AppRouter = (): JSX.Element => (
  <main className='container'>
    <Row>
      <Col className=''>
        <Banner />
        <Routes>
          {publicRoutes.map(({ path, component: Component }: IPublicRoute) => (
            <Route key={path} path={path} element={<Component />} />
          ))
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Col>
    </Row>
  </main>
);

export default AppRouter;
