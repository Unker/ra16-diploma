import React, {
  Col,
  Container,
  Nav,
  Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './Footer.module.css';
import { ABOUT_ROUTE, CATALOG_ROUTE, CONTACTS_ROUTE } from '../../utils/consts';

const Footer = (): JSX.Element => (
  <footer className='bg-light footer'>
    <Container>
      <Row>
        <Col>
          <section>
            <h5>Информация</h5>
            <Nav className='flex-column navbar-light bg-light'>
              <NavLink className={cn('nav-link', s.link)} to={ABOUT_ROUTE}>О магазине</NavLink>
              <NavLink className={cn('nav-link', s.link)} to={CATALOG_ROUTE}>Каталог</NavLink>
              <NavLink className={cn('nav-link', s.link)} to={CONTACTS_ROUTE}>Контакты</NavLink>
            </Nav>
          </section>
        </Col>
        <Col>
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className={s.footerPay}>
              <div className={cn(s.footerPaySystems, s.footerPaySystemsPaypal)}></div>
              <div className={cn(s.footerPaySystems, s.footerPaySystemsMasterCard)}></div>
              <div className={cn(s.footerPaySystems, s.footerPaySystemsVisa)}></div>
              <div className={cn(s.footerPaySystems, s.footerPaySystemsYandex)}></div>
              <div className={cn(s.footerPaySystems, s.footerPaySystemsWebmoney)}></div>
              <div className={cn(s.footerPaySystems, s.footerPaySystemsQiwi)}></div>
            </div>
          </section>
          <section>
            <div className={s.footerCopyright}>
              2009-2024 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
              Все права защищены.
              <br />
              Доставка по всей России!
            </div>
          </section>
        </Col>
        <Col className='text-end'>
          <section className={s.footerContacts}>
            <h5>Контакты:</h5>
            <a
              className={cn(s.footerContactsPhone, s.link)}
              href="tel:+7-495-790-35-03">+7 495 79 03 5 03
            </a>
            <span className={s.footerContactsWorkingHours}>Ежедневно: с 09-00 до 21-00</span>
            <a
              className={cn(s.footerContactsEmail, s.link)}
              href="mailto:office@bosanoga.ru">office@bosanoga.ru
            </a>
            <div className={s.footerSocialLinks}>
              <div className={cn(s.footerSocialLink, s.footerSocialLinkTwitter)}></div>
              <div className={cn(s.footerSocialLink, s.footerSocialLinkVk)}></div>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
