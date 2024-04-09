import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Item from './Item.tsx';
import { useGetTopSalesQuery } from '../api/itemsApi';

const TopSales = () => {
  const {
    data: topSalesList = [],
    isFetching: isFetchingTop,
    isError: isErrorTop,
    isLoading: isLoadingTop,
  } = useGetTopSalesQuery();

  useEffect(() => {
    if (isErrorTop) {
      // Обработка ошибки
    }
  }, [isErrorTop]);

  if (isLoadingTop) return <div className="top-sales">Loading TopSales...</div>;
  if (isErrorTop) return <div className="top-sales">Error occurred TopSales</div>;
  if (isFetchingTop) return <div className="top-sales">Loading more data...</div>;
  if (topSalesList?.length === 0) return null;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <Row className='d-flex justify-content-between'>
        {topSalesList.map((item) => <Item key={item.id} item={item} />)}
      { isFetchingTop ? <div>Loading more data...</div> : null}
    </Row>
    </section >
  );
};

export default TopSales;
