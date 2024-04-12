import React, { useEffect, useState } from 'react';
import {
  Button, Card, Form, Table,
} from 'react-bootstrap';
import checkPhoneNumber from '../utils/phone/checkPhoneNumber';
import { PRODUCT_ROUTE } from '../utils/consts';
import { ICartItem } from '../components/types';
import { NavLink } from 'react-router-dom';

const CartPage = () => {
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const readCartItems = () => {
    // Загрузка корзины из localStorage
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }

  useEffect(() => {
    readCartItems();
  }, []);

  const handleRemoveItemFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    readCartItems();
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
    setPhoneValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Проверка валидности номера телефона
    const correctedPhone = checkPhoneNumber(phone);
    const isValid = (correctedPhone !== null);
    setPhoneValid(isValid);
    if (isValid) {
      setPhone(correctedPhone);
      console.log('Форма отправлена', correctedPhone);
    }
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <Table bordered>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.length > 0 && (
              <>
                {cartItems.map(({ id, size, title, count, price }, index) => {
                  const groupTotalPrice = price * count;
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td>
                        <NavLink className="nav-link" to={`${PRODUCT_ROUTE}/${id}`}>{title}</NavLink>
                      </td>
                      <td>{size}</td>
                      <td>{count}</td>
                      <td>{price} руб.</td>
                      <td>{groupTotalPrice} руб.</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          className="btn-sm"
                          onClick={() => handleRemoveItemFromCart(id)}
                        >
                          Удалить
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} className="text-right">Общая стоимость</td>
                  <td>
                    {cartItems.reduce((total, { price, count }) => total + price * count, 0)} руб.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <Card style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ваш телефон"
                  value={phone}
                  onChange={handlePhoneChange}
                  isInvalid={!phoneValid}
                />
                {!phoneValid && (
                  <p className='mt-n2 mb-2'
                    style={{ color: 'red', fontSize: '0.8rem' }}
                  >
                    Пожалуйста, введите корректный номер
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Адрес доставки</Form.Label>
                <Form.Control type="text" placeholder="Адрес доставки" required />
              </Form.Group>
              <Form.Group controlId="agreement" className="mb-3">
                <Form.Check type="checkbox" label="Согласен с правилами доставки" required />
              </Form.Group>
              <Button variant="outline-secondary" type="submit">Оформить</Button>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </>
  );
};

export default CartPage;
