import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import checkPhoneNumber from '../utils/phone/checkPhoneNumber';

const OrderForm = () => {
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);

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

export default OrderForm;
