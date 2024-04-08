import { useGetCategoriesQuery } from "../api/itemsApi";
import { useEffect, useMemo, useState } from "react";
import { ICategory } from "./types";


const CategoryBar = () => {
  const {
    data: categories = [],
    isFetching,
    isError,
    isLoading
  } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const allCategory: ICategory = { id: 0, title: "Все" };

  const categoriesWithAll = useMemo(() => {
    return [allCategory, ...categories];
  }, [categories]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
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
