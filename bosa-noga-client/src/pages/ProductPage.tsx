import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, ButtonGroup, Col, Image, Row, Table,
} from 'react-bootstrap';
import { useState } from 'react';
import { CART_ROUTE } from '../utils/consts';
import { useGetItemByIdQuery } from '../api/itemsApi';

const ProductPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  const {
    data,
    // isFetching,
    isError,
    isLoading,
  } = useGetItemByIdQuery(Number(id));

  // useEffect(() => {

  // }, [])

  const validateCount = ((val: number) => {
    const maxCount = 10;
    const minCount = 1;
    let res = val;
    if (val > maxCount) res = maxCount;
    if (val < minCount) res = minCount;
    setCount(res);
  });

  const handleOrderProduct = (() => {
    navigate(CART_ROUTE);
  });

  if (isLoading) return <div>Loading Item...</div>;
  if (isError) return <div>Error occurred Item</div>;

  return (
    <>
      Hello + {id}
      {data
        && <section className="catalog-item">
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
              </div>
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
            </Col>
          </Row>
        </section>
      }
    </>
  );
};

export default ProductPage;
