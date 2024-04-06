import { NavLink } from 'react-router-dom';
import {
  Col,
  Container,
  Image,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import {
  ABOUT_ROUTE,
  CATALOG_ROUTE,
  CONTACTS_ROUTE,
  MAIN_PAGE_ROUTE,
} from '../utils/consts';
import '../index.css';

const Header = () => {
  <NavLink to={MAIN_PAGE_ROUTE} className="nav-link">Главная</NavLink>;

  return (
    <header>
      <Row>
        <Col>
          <Navbar className="navbar navbar-expand-sm navbar-light bg-light">
            <Container>
              <Navbar.Brand>
                <NavLink className="navbar-brand" to={MAIN_PAGE_ROUTE}>
                  <Image src="./img/header-logo.png" alt="Bosa Noga" />
                </NavLink>
              </Navbar.Brand>
              <Nav className="mr-auto">
                <NavLink className="nav-link" to={MAIN_PAGE_ROUTE}>Главная</NavLink>
                <NavLink className="nav-link" to={CATALOG_ROUTE}>Каталог</NavLink>
                <NavLink className="nav-link" to={ABOUT_ROUTE}>О магазине</NavLink>
                <NavLink className="nav-link" to={CONTACTS_ROUTE}>Контакты</NavLink>

                <div>
                  <div className="header-controls-pics">
                    <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                    <input className="form-control" placeholder="Поиск" />
                  </form>
                </div>
              </Nav>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
