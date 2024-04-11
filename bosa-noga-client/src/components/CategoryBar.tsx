import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Placeholder } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useGetCategoriesQuery } from '../api/itemsApi';
import { RootState } from '../store/store';
import { setSelectedCategory } from '../store/selectedCategorySlice';
import { setCategories } from '../store/categoriesSlice';
import { ICategory } from './types';

const CategoryBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);

  const {
    data: categories = [],
    isFetching,
    isError,
    isLoading,
  } = useGetCategoriesQuery();

  const categoriesWithAll = useMemo(() => {
    const allCategory: ICategory = { id: 0, title: 'Все' };
    return [allCategory, ...categories];
  }, [categories]);

  const itemsList = useMemo(() => {
    if (isFetching) return [];
    return categoriesWithAll;
  }, [categoriesWithAll, isFetching]);

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  useEffect(() => {
    // установка категории "Все" при межстраничной навигации
    dispatch(setSelectedCategory(0));
  }, [location.pathname, dispatch]);

  const handleSelectCategory = (categoryId: number) => {
    dispatch(setSelectedCategory(categoryId));
  };

  useEffect(() => {
    if (isError) {
      // Обработка ошибки
    }
  }, [isError]);

  return (
    <div className='d-flex flex-direction-row justify-content-center'>
      {(isLoading || isFetching)
        && <Placeholder as={Nav.Link} animation="glow" className='mx-3 mb-4' style={{ width: '60%' }}>
          <Placeholder style={{ width: '100%' }} />
        </Placeholder>
      }
      <Nav variant="underline">
        {categories && itemsList.map((category) => {
          const isSelected = category.id === selectedCategory ? ' active ' : '';
          return <Nav.Item key={category.id}>
            <Nav.Link
              key={category.id}
              className={`mx-3 mb-4 ${isSelected}`}
              onClick={() => handleSelectCategory(category.id)}
            >
              {category.title}
            </Nav.Link>
          </Nav.Item>;
        })}
      </Nav>
    </div>
  );
};

export default CategoryBar;
