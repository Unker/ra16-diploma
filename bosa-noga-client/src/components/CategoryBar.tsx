import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../api/itemsApi';
import { RootState } from '../store/store';
import { setSelectedCategory } from '../store/selectedCategorySlice';
import { setCategories } from '../store/categoriesSlice';
import { ICategory } from './types';

const CategoryBar = () => {
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

  const handleSelectCategory = (categoryId: number) => {
    dispatch(setSelectedCategory(categoryId));
  };

  useEffect(() => {
    if (isError) {
      // Обработка ошибки
    }
  }, [isError]);

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [dispatch, categories]);

  if (isLoading) return <div>Loading Categories...</div>;
  if (isError) return null;

  return (
    <div className='d-flex flex-direction-row justify-content-center'>
      {categories && categoriesWithAll.map((category) => {
        const isSelected = category.id === selectedCategory ? ' active ' : '';
        return <a
          key={category.id}
          className={`nav-link mx-3 mb-4 ${isSelected}`}
          onClick={() => handleSelectCategory(category.id)}
        >
          {category.title}
        </a>;
      })}
      {isFetching ? <div>Loading more data...</div> : null}
    </div>
  );
};

export default CategoryBar;
