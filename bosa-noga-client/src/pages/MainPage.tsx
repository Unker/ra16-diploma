import { Suspense } from 'react';
import TopSales from '../components/TopSales.tsx';
import Catalog from '../components/Сatalog.tsx';
import Preloader from '../components/Preloader.tsx';

const MainPage = (): JSX.Element => (
  <Suspense fallback={<Preloader />}>
    <TopSales />
    <Catalog />
  </Suspense>
);

export default MainPage;
