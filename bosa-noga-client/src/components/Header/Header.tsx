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
} from '../../utils/consts';
import cn from 'classnames';
import '../../index.css';
import s from './Header.module.css';

const Header = (): JSX.Element => {
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
                  <div className={s.headerControlsPics}>
                    <div data-id="search-expander" className={cn(s.headerControlsPic, s.headerControlsSearch)}></div>
                    <div className={cn(s.headerControlsPic, s.headerControlsCart)}>
                      <div className={s.headerControlsCartFull}>1</div>
                      <div className={s.headerControlsCartMenu}></div>
                    </div>
                  </div>
                  <form data-id="search-form" className={cn(s.headerControlsSearchForm, 'form-inline', 'invisible')}>
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
