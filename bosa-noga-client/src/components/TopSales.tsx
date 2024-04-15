import { useEffect, useMemo } from 'react';
import Item from './Item.tsx';
import { useGetTopSalesQuery } from '../api/itemsApi';
import Preloader from './Preloader/Preloader.tsx';
import getRtkErrorMessage from '../utils/getRtkErrorMessage';
import RetryButton from './RetryButton/RetryButton.tsx';

const TopSales = () => {
  const {
    data: topSalesList = [],
    isFetching,
    isError,
    isLoading,
    error,
    refetch,
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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (error) {
      intervalId = setInterval(() => {
        refetch();
      }, 15000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [error, refetch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(isLoading || isFetching) && <Preloader />}
      {!(isLoading || isFetching) && isError && (
        <RetryButton refetch={refetch} />
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
