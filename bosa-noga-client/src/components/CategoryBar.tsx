import { useGetCategoriesQuery } from "../api/itemsApi";
import { useEffect, useMemo } from "react";
import { ICategory } from "./types";
import { setSelectedCategory } from "../store/selectedCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';

const CategoryBar = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  
  const {
    data: categories = [],
    isFetching,
    isError,
    isLoading
  } = useGetCategoriesQuery();

  const allCategory: ICategory = { id: 0, title: "Все" };

  const categoriesWithAll = useMemo(() => {
    return [allCategory, ...categories];
  }, [categories]);

  const handleSelectCategory = (categoryId: number) => {
    dispatch(setSelectedCategory(categoryId));
  }

  useEffect(() => {
    if (isError) {
      // Обработка ошибки
    }
  }, [isError]);

  if (isLoading) return <div>Loading Categories...</div>;
  if (isError) return null;

  return (
    <div className='d-flex flex-direction-row justify-content-center'>
      {categories && categoriesWithAll.map((category) => {
        const isSelected = category.id === selectedCategory ? ' active ' : '';
        if (isSelected) console.log('cat=', selectedCategory)
        return <a
          key={category.id}
          className={`nav-link mx-3 mb-4 ${isSelected}`}
          onClick={() => handleSelectCategory(category.id)}
        >
          {category.title}
        </a>
      }
      )}
      {isFetching ? <div>Loading more data...</div> : null}
    </div>
  );
};

export default CategoryBar;
