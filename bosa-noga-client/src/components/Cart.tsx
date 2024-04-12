import { Button, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { PRODUCT_ROUTE } from '../utils/consts';
import { setCartItems } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const handleRemoveItemFromCart = (id: number) => {
    const updatedCartItems = cartItems?.filter((item) => item.id !== id) || [];
    dispatch(setCartItems(updatedCartItems));
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
            {cartItems && cartItems?.length > 0 && (
              <>
                {cartItems.map((item, index) => {
                  const {
                    id, size, title, count, price,
                  } = item;
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
    </>
  );
};

export default Cart;
