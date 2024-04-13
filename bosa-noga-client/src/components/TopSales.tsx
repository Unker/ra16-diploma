import { useEffect, useMemo } from 'react';
import { Row } from 'react-bootstrap';
import Item from './Item.tsx';
import { useGetTopSalesQuery } from '../api/itemsApi';
import Preloader from './Preloader/Preloader.tsx';
import getRtkErrorMessage from '../utils/getRtkErrorMessage';

const TopSales = () => {
  const {
    data: topSalesList = [],
    isFetching,
    isError,
    error,
    isLoading,
  } = useGetTopSalesQuery();

  const itemsList = useMemo(() => {
    if (isFetching) return [];
    return topSalesList;
  }, [topSalesList, isFetching]);

  useEffect(() => {
    if (error) {
      const errMsg = getRtkErrorMessage(error);
      console.log(errMsg);
    }
  }, [error]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(isLoading || isFetching) && <Preloader />}
      {!(isLoading || isFetching) && isError && (
        <div className="text-center">Ошибка получения данных от сервера</div>
      )}
      {(itemsList?.length > 0) && (
        <div
          className='d-flex justify-content-center'
          style={{ flexFlow: 'wrap' }}
        >
          {itemsList.map((item) => <Item key={item.id} item={item} />)}
        </div>
      )}
    </section >
  );
};

export default TopSales;
