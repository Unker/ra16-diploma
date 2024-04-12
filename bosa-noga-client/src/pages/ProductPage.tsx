import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, ButtonGroup, Col, Image, Row, Table,
} from 'react-bootstrap';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CART_ROUTE } from '../utils/consts';
import { useGetItemByIdQuery } from '../api/itemsApi';
import Preloader from '../components/Preloader/Preloader.tsx';
import { setCartItems } from '../store/cartSlice';

const ProductPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const {
    data,
    isFetching,
    isError,
    isLoading,
  } = useGetItemByIdQuery(Number(id));

  useEffect(() => {
    // Сброс выбранного размера при загрузке нового товара
    setSelectedSize('');
  }, [id]);

  const validateCount = ((val: number) => {
    const maxCount = 10;
    const minCount = 1;
    let res = val;
    if (val > maxCount) res = maxCount;
    if (val < minCount) res = minCount;
    setCount(res);
  });

  const isAvailableSomeSize = useMemo(() => (
    data?.sizes.some(({ available }) => available)
  ), [data]);

  // useEffect(() => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [cartItems]);

  const handleOrderProduct = useCallback(() => {
    const existIdx = cartItems.findIndex(
      (item) => item.id === Number(id) && item.size === selectedSize,
    );
    if (existIdx !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existIdx) {
          return { ...item, count: item.count + count };
        }
        return item;
      });
      dispatch(setCartItems(updatedCartItems));
    } else {
      const newItem = {
        id: Number(id),
        size: selectedSize,
        title: (data !== undefined) ? data.title : `Продукт ${id}`,
        count,
        price: (data !== undefined) ? data.price : 0,
      };
      dispatch(setCartItems([...cartItems, newItem]));
    }
    navigate(CART_ROUTE);
  }, [id, selectedSize, count, cartItems, data, navigate, dispatch]);

  return (
    <>
      <section className="catalog-item">
        {(isLoading || isFetching) && <Preloader />}
        {!(isLoading || isFetching) && isError
          && <div>'Error occurred...</div>
        }
        {!(isLoading || isFetching) && data
          && <>
            <h2 className="text-center">{data.title}</h2>
            <Row>
              <Col className="col-5">
                <Image src={data.images[0]}
                  className="img-fluid" alt={data.title} />
              </Col>
              <Col className="col-7">
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{data.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{data.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{data.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{data.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{data.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{data.reason}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="text-center">
                  <div className="mb-3">
                    {'Размеры в наличии: '}
                    {data.sizes.map(({ size, available }, index) => {
                      const isSelected = size === selectedSize ? 'selected' : '';
                      return available && <span
                        key={index}
                        className={`catalog-item-size ${isSelected}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </span>;
                    })}
                  </div>
                  {!isAvailableSomeSize && (
                    <span>К сожалению, нет доступных размеров</span>
                  )}
                  {isAvailableSomeSize && (
                    <div className="mb-3">
                      {'Количество: '}
                      <ButtonGroup
                        size="sm"
                        className="pl-2"
                      >
                        <Button
                          variant="secondary"
                          onClick={() => validateCount(count - 1)}
                        >-</Button>
                        <Button
                          variant="outline-primary"
                        >{count}</Button>
                        <Button
                          variant="secondary"
                          onClick={() => validateCount(count + 1)}
                        >+</Button>
                      </ButtonGroup>
                    </div>
                  )}
                </div>
                {isAvailableSomeSize && (
                  <div className="d-grid">
                    <Button
                      variant="danger"
                      size="lg"
                      disabled={selectedSize === ''}
                      onClick={() => handleOrderProduct()}
                    >
                      В корзину
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </>
        }
      </section>
    </>
  );
};

export default ProductPage;
