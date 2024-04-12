import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IItemShort } from './types';
import { PRODUCT_ROUTE } from '../utils/consts';
import Preloader from './Preloader/Preloader';

interface ItemProps {
  item: IItemShort;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('load img ', item.id);
  };

  const handleOrderClick = () => {
    navigate(`${PRODUCT_ROUTE}/${item.id}`);
  };

  return (
    <Card
      className='mb-4 pt-2 catalog-item-card'
      style={{ width: '32%' }}
    >
      <div className='d-flex flex-column h-100' style={{minHeight: '400px'}}>
        {imageLoaded ? (
          <Card.Img
            variant="top"
            src={item.images[0]}
            alt={item.title}
            style={{ flex: '1', objectFit: 'contain' }}
            onLoad={handleImageLoad}
          />
        ) : (
          <div
            style={{ flex: '1', objectFit: 'contain' }}
            className="position-relative top-50 start-50 translate-middle"
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
