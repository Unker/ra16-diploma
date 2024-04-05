import MainPage from './pages/MainPage';
import ProductCatalog from './pages/ProductCatalog';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { MAIN_PAGE_ROUTE, CATALOG_ROUTE, ABOUT_ROUTE, CONTACTS_ROUTE, PRODUCT_ROUTE, CART_ROUTE } from './utils/consts';
import { RouteConfig } from 'react-router-dom';


export const publicRoutes: RouteConfig[] = [
  {
    path: MAIN_PAGE_ROUTE,
    component: MainPage,
  },
  {
    path: CATALOG_ROUTE,
    component: ProductCatalog,
  },
  {
    path: ABOUT_ROUTE,
    component: AboutPage,
  },
  {
    path: CONTACTS_ROUTE,
    component: ContactsPage,
  },
  {
    path: `${PRODUCT_ROUTE}/:id`,
    component: ProductPage,
  },
  {
    path: CART_ROUTE,
    component: CartPage,
  },
];