import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../api/itemsApi';
import { setCartItems } from '../store/cartSlice';
import { RootState } from '../store/store';
import checkPhoneNumber from '../utils/phone/checkPhoneNumber';
import Preloader from './Preloader/Preloader.tsx';
import { IOrder } from './types';
import getRtkErrorMessage from '../utils/getRtkErrorMessage';

const OrderForm: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  const dispatch = useDispatch();
  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      // сброс формы
      setPhone('');
      setAddress('');

      dispatch(setCartItems([]));
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      const errMsg = getRtkErrorMessage(error);
      console.log(errMsg);
      toast.error(
        'Ошибка формирования заказа. Повторите попытку чуть позже',
        { position: 'top-center' },
      );
    }
  }, [error]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
    setIsValidPhone(true);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddress(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Проверка валидности номера телефона
    const correctedPhone = checkPhoneNumber(phone);
    const isValid = (correctedPhone !== null);
    setIsValidPhone(isValid);
    const isCartNotEmpty = cartItems.length > 0;
    if (isValid && isCartNotEmpty) {
      setPhone(correctedPhone);
      try {
        const order: IOrder = {
          owner: { phone: correctedPhone, address },
          items: cartItems.map((item) => ({
            id: item.id, price: item.price, count: item.count, size: item.size,
          })),
        };
        await createOrder(order).unwrap();
        console.log('Order created successfully!');
        toast.success('Ваш заказ успешно создан', { position: 'top-center' });
      } catch (err) {
        console.log('error create order, err=', err);
      }
    }

    if (!isCartNotEmpty) {
      toast.warning('Ваша корзина пуста', { position: 'top-center' });
    }
  };

  return (
    <>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <Card style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <fieldset
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.2 : 1 }}
              >
                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ваш телефон"
                    value={phone}
                    onChange={handlePhoneChange}
                    isInvalid={!isValidPhone}
                  />
                  {!isValidPhone && (
                    <p className='mt-n2 mb-2'
                      style={{ color: 'red', fontSize: '0.8rem' }}
                    >
                      Пожалуйста, введите корректный номер
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Адрес доставки</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Адрес доставки"
                    value={address}
                    onChange={handleAddressChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="agreement" className="mb-3">
                  <Form.Check type="checkbox" label="Согласен с правилами доставки" required />
                </Form.Group>
                <Button variant="outline-secondary" type="submit">Оформить</Button>
              </fieldset>
            </Form>
          </Card.Body>
          {(isLoading) && (
            <div className="position-absolute top-50 start-50 translate-middle">
              <Preloader />
            </div>
          )}
        </Card>
      </section>
    </>
  );
};

export default OrderForm;
