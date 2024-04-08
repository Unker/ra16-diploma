import MainPage from './pages/MainPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactsPage from './pages/ContactsPage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import CartPage from './pages/CartPage.tsx';
import {
  MAIN_PAGE_ROUTE,
  CATALOG_ROUTE,
  ABOUT_ROUTE,
  CONTACTS_ROUTE,
  PRODUCT_ROUTE,
  CART_ROUTE,
} from './utils/consts';

export interface IPublicRoute {
  path: string;
  component: React.FC;
}

const publicRoutes: IPublicRoute[] = [
  {
    path: MAIN_PAGE_ROUTE,
    component: MainPage,
  },
  {
    path: CATALOG_ROUTE,
    component: CatalogPage,
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

export default publicRoutes;
