import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useGetItemsQuery } from '../api/itemsApi';

interface LoadMoreProps {
  offset: number;
  onLoadMore: () => void;
}

const LoadMoreItems: React.FC<LoadMoreProps> = ({ offset, onLoadMore }) => {
  const {
    data: itemsList = [], isFetching, isError, isLoading,
  } = useGetItemsQuery({ offset });

  useEffect(() => {
    if (isError) {
      // Обработка ошибки
    }
  }, [isError]);

  return (
    <div className='d-flex justify-content-center' >
      {isFetching ? <div>Loading more data...</div> : null}
      <Button
        variant="outline-dark"
        onClick={onLoadMore}
        disabled={isLoading || itemsList.length < 6}
      >
        {isLoading ? 'Loading...' : 'Загрузить ещё'}
      </Button>
    </div>
  );
};

export default LoadMoreItems;
