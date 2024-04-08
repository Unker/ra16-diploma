import { ReactNode, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import CategoryBar from './CategoryBar';
import Item from './Item';
import { useGetItemsQuery } from '../api/itemsApi';

interface CatalogProps {
  searchComponent?: ReactNode;
}

const Catalog: React.FC<CatalogProps> = ({ searchComponent }) => {

  const { data: topSalesList = [],
    isFetching: isFetchingItems,
    isError: isErrorItems,
    isLoading: isLoadingItems
  } = useGetItemsQuery({});

  useEffect(() => {
    if (isErrorItems) {
      // Обработка ошибки
    }
  }, [isErrorItems]);


  if (isLoadingItems) return <div>Loading Items...</div>;
  if (isErrorItems) return <div>Error occurred Items</div>;

  return (
    <section className="top-sales catalog">
      <h2 className="text-center">Каталог</h2>
      {searchComponent && <div>{searchComponent}</div>}
      <CategoryBar />
      <Row className='d-flex justify-content-between'>
        {topSalesList.map((item) => {
          return <Item key={item.id} item={item} />
        }
        )}
        {isFetchingItems ? <div>Loading more data...</div> : null}
      </Row>
      <div>Загрузить еще</div>
    </section>
  );
};

export default Catalog;
