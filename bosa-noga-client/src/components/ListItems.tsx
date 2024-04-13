import React from 'react';
import { IItemShort } from './types';
import Item from './Item.tsx';

interface ItemProps {
  itemsList: IItemShort[];
}

const ListItems: React.FC<ItemProps> = ({ itemsList }) => (
  <div
    className='d-flex justify-content-center'
    style={{ flexFlow: 'wrap' }}
  >
    {itemsList.map((item: IItemShort) => <Item key={item.id} item={item} />)}
  </div>
);

export default ListItems;
