import MainPage from './pages/MainPage.tsx';
import ProductCatalog from './pages/ProductCatalog.tsx';
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

export interface PublicRoute {
  path: string;
  component: React.FC;
}

const publicRoutes: PublicRoute[] = [
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

export default publicRoutes;
