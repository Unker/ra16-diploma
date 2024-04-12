import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import AppRouter from './components/AppRouter.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Container className='p-0'>
        <Header />
        <AppRouter />
        <Footer />
      </Container>
      <ToastContainer pauseOnFocusLoss />
    </BrowserRouter>
  );
}

export default App;
