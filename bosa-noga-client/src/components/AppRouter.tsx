import { Routes, Route } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import publicRoutes, { PublicRoute } from '../routes';
import NotFoundPage from '../pages/NotFoundPage.tsx';

const AppRouter = (): JSX.Element => (
  <Container>
    <Row>
      <Col>
        {/* баннер тут */}
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
