import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Col,
  Form,
  Image,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import cn from 'classnames';
import {
  ABOUT_ROUTE,
  CATALOG_ROUTE,
  CONTACTS_ROUTE,
  MAIN_PAGE_ROUTE,
} from '../../utils/consts';
import '../../index.css';
import s from './Header.module.css';

const Header = (): JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

  const redirectToCatalogPage = () => {
    const query = searchText.trim();
    if (query !== '') {
      navigate(CATALOG_ROUTE, { state: { headerSearchQuery: query } });
    }
    setSearchText('');
    setSearchVisible(false);
  };

  const handleSearchIconClick = () => {
    if (searchVisible) {
      redirectToCatalogPage();
    }
    setSearchVisible(!searchVisible);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchText(value);
  };

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirectToCatalogPage();
  };

  return (
    <header className='container'>
      <Row>
        <Col>
          <Navbar className="navbar navbar-expand-sm navbar-light bg-light px-3">
            <Navbar.Brand>
              <NavLink className="navbar-brand" to={MAIN_PAGE_ROUTE}>
                <Image src="./img/header-logo.png" alt="Bosa Noga" />
              </NavLink>
            </Navbar.Brand>
            <div className="collapse navbar-collapse" id="navbarMain">
              <Nav className="me-auto">
                <NavLink className="nav-link" to={MAIN_PAGE_ROUTE}>Главная</NavLink>
                <NavLink className="nav-link" to={CATALOG_ROUTE}>Каталог</NavLink>
                <NavLink className="nav-link" to={ABOUT_ROUTE}>О магазине</NavLink>
                <NavLink className="nav-link" to={CONTACTS_ROUTE}>Контакты</NavLink>
              </Nav>
              <div>
                <div className={s.headerControlsPics}>
                  <div
                    data-id="search-expander"
                    className={cn(s.headerControlsPic, s.headerControlsSearch)}
                    onClick={handleSearchIconClick}
                  >
                  </div>
                  <div className={cn(s.headerControlsPic, s.headerControlsCart)}>
                    <div className={s.headerControlsCartFull}>1</div>
                    <div className={s.headerControlsCartMenu}></div>
                  </div>
                </div>

                {searchVisible && (
                  <div>
                    <Form
                      data-id="search-form"
                      className={`form-inline ${s.headerControlsSearchForm}`}
                      onSubmit={handleSearchFormSubmit}
                    >
                      <Form.Control
                        className={`${s.formСontrol}`}
                        placeholder="Поиск"
                        value={searchText}
                        onChange={(e) => handleSearchInputChange(e.target.value)}
                      />
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </Navbar>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
