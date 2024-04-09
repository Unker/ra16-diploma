import React from 'react';
import { Row } from 'react-bootstrap';
import { IItemShort } from './types';
import Item from './Item.tsx';

interface ItemProps {
  itemsList: IItemShort[];
}

const ListItems: React.FC<ItemProps> = ({ itemsList }) => (
    <Row className='d-flex justify-content-between'>
      {itemsList.map((item: IItemShort) => <Item key={item.id} item={item} />)}
    </Row>
);

export default ListItems;
