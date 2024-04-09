import { CatalogSearch } from '../components/Search/Search.tsx';
import Catalog from '../components/Сatalog.tsx';

const CatalogPage = (): JSX.Element => (
  <>
    <Catalog searchComponent={<CatalogSearch />} />
  </>
);

export default CatalogPage;
