import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppRouter from './components/AppRouter.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <AppRouter />
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
