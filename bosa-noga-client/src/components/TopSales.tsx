import { useEffect, useMemo } from 'react';
import { Row } from 'react-bootstrap';
import Item from './Item.tsx';
import { useGetTopSalesQuery } from '../api/itemsApi';
import Preloader from './Preloader.tsx';

const TopSales = () => {
  const {
    data: topSalesList = [],
    isFetching,
    isError,
    isLoading,
  } = useGetTopSalesQuery();

  const itemsList = useMemo(() => {
    if (isFetching) return [];
    return topSalesList;
  }, [topSalesList, isFetching]);

  useEffect(() => {
    if (isError) {
      console.log('Error occurred TopSales');
    }
  }, [isError]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(isLoading || isFetching) && <Preloader />}
      {!(isLoading || isFetching) && isError
        && <div>'Error occurred TopSales</div>
      }
      {(itemsList?.length > 0)
        && <Row className='d-flex justify-content-between'>
          {itemsList.map((item) => <Item key={item.id} item={item} />)}
        </Row>
      }

    </section >
  );
};

export default TopSales;
