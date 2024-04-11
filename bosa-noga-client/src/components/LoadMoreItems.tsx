import { Button } from 'react-bootstrap';

interface LoadMoreProps {
  offset: number;
  countLoadItems: number,
  onLoadMore: () => void;
}

const LoadMoreItems: React.FC<LoadMoreProps> = ({ onLoadMore }) => (
  <div className='d-flex justify-content-center' >
    <Button
      variant="outline-dark"
      onClick={onLoadMore}
    >
      Загрузить ещё
    </Button>
  </div>
);

export default LoadMoreItems;
