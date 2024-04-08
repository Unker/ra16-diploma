import React from 'react'
import { IItemShort } from './types';
import { Row } from 'react-bootstrap';
import Item from './Item';

interface ItemProps {
  itemsList: IItemShort[];
}

const ListItems: React.FC<ItemProps> = ({ itemsList }) => {
  return (
    <Row className='d-flex justify-content-between'>
      {itemsList.map((item: IItemShort) => {
        return <Item key={item.id} item={item} />
      }
      )}
    </Row>
  );
};

export default ListItems;
