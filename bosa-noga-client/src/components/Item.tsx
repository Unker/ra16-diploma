import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IItemShort } from './types';
import { PRODUCT_ROUTE } from '../utils/consts';
import Preloader from './Preloader/Preloader.tsx';

interface ItemProps {
  item: IItemShort;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleOrderClick = () => {
    navigate(`${PRODUCT_ROUTE}/${item.id}`);
  };

  return (
    <Card
      className='mb-3 me-4 pt-2 catalog-item-card'
      style={{ width: '30%', minWidth: '300px', maxWidth: '350px' }}
    >
      <div className='d-flex flex-column h-100' style={{ minHeight: '400px' }}>
        <Card.Img
          variant="top"
          src={item.images[0]}
          alt={item.title}
          style={{ flex: '1', objectFit: 'contain', opacity: imageLoaded ? '1' : '0' }}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <div
            style={{ flex: '1', objectFit: 'contain', top: '30%' }}
            className="position-absolute start-50 translate-middle"
          >
            <Preloader />
          </div>
        )}
        <Card.Footer style={{ backgroundColor: 'inherit', border: 'none' }}>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.price} руб.</Card.Text>
          <Button
            variant="outline-dark"
            className="btn btn-light align-self-start "
            onClick={handleOrderClick}
          >
            Заказать
          </Button>

        </Card.Footer>
      </div>
    </Card>
  );
};

export default Item;
