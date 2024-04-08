import React from 'react';
import { IItemShort } from './types'; // Предполагается, что ваш интерфейс находится в файле types.ts

interface ItemProps {
  item: IItemShort;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const handleOrderClick = () => {
    // Обработчик клика на кнопке заказа
    console.log(`Заказ товара: ${item.title}`);
  };

  return (
    <div className="catalog-item-card col-lg-4 mb-4 border rounded p-3 d-flex flex-column justify-content-between">
      <div className="flex-grow-1">
        <img src={item.images[0]} alt={item.title} className="img-fluid" />
      </div>
      <h5 className="item-name">{item.title}</h5>
      <p className="item-price">{item.price} руб.</p>
      <button className="btn btn-light align-self-start " onClick={handleOrderClick}>Заказать</button>
    </div>
  );
};

export default Item;
