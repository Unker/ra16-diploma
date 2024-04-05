import { NavLink, useNavigate } from 'react-router-dom';
import { ABOUT_ROUTE, CATALOG_ROUTE, CONTACTS_ROUTE, MAIN_PAGE_ROUTE } from '../utils/consts';
import "../index.css"
import { Col, Container, Navbar, Row } from 'react-bootstrap';

const Header = () => {
  // const navigate = useNavigate()
  <NavLink to={MAIN_PAGE_ROUTE} className="nav-link">Главная</NavLink>

  return (
    <header>
      <Container>
        <Row>
          <Col>
            <Navbar.Brand>
              <NavLink className="navbar-brand" to={MAIN_PAGE_ROUTE}>
                <img src="./img/header-logo.png" alt="Bosa Noga" />
              </NavLink>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <NavLink className="nav-link" to={MAIN_PAGE_ROUTE}>Главная</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={CATALOG_ROUTE}>Каталог</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={ABOUT_ROUTE}>О магазине</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={CONTACTS_ROUTE}>Контакты</NavLink>
                  </li>
                </ul>
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
              </div>
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
