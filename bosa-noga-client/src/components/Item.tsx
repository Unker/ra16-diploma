import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IItemShort } from './types';
import { PRODUCT_ROUTE } from '../utils/consts';

interface ItemProps {
  item: IItemShort;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    console.log(`Заказ товара: ${item.title}`);
    navigate(`${PRODUCT_ROUTE}/${item.id}`);
  };

  return (
    <Card className='mb-4 pt-2 catalog-item-card' style={{ width: '32%' }}>
      <Card.Img variant="top" src={item.images[0]} alt={item.title} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.price} руб.</Card.Text>
        <Button
          variant="outline-dark"
          className="btn btn-light align-self-start "
          onClick={handleOrderClick}
        >
          Заказать
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
