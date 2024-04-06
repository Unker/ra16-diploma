import { Routes, Route } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import publicRoutes, { PublicRoute } from '../routes';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import Banner from './Banner/Banner.tsx';

const AppRouter = (): JSX.Element => (
  <Container>
    <Row>
      <Col>
        <Banner />
        <Routes>
          {publicRoutes.map(({ path, component: Component }: PublicRoute) => (
            <Route key={path} path={path} element={<Component />} />
          ))
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Col>
    </Row>
  </Container>
);

export default AppRouter;
