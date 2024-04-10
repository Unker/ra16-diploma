import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useGetItemsQuery } from '../api/itemsApi';

interface LoadMoreProps {
  offset: number;
  countLoadItems: number,
  onLoadMore: () => void;
}

const LoadMoreItems: React.FC<LoadMoreProps> = ({ offset, countLoadItems, onLoadMore }) => {
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
      <Button
        variant="outline-dark"
        onClick={onLoadMore}
        disabled={isLoading || itemsList.length < countLoadItems}
      >
        {(isLoading || isFetching) ? 'Loading...' : 'Загрузить ещё'}
      </Button>
    </div>
  );
};

export default LoadMoreItems;
