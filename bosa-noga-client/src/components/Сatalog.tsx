import { ReactNode, useEffect, useState } from 'react';
import CategoryBar from './CategoryBar';
import { useGetItemsQuery } from '../api/itemsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ListItems from './ListItems';

interface CatalogProps {
  searchComponent?: ReactNode;
}

const Catalog: React.FC<CatalogProps> = ({ searchComponent }) => {
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  const [offset, setOffset] = useState(0);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 6);
  };

  const { data: itemsList = [],
    isFetching: isFetchingItems,
    isError: isErrorItems,
    isLoading: isLoadingItems
  } = useGetItemsQuery({ categoryId: selectedCategory, offset });

  useEffect(() => {
    if (isErrorItems) {
      // Обработка ошибки
    }
  }, [isErrorItems]);


  if (isLoadingItems) return <div>Loading Items...</div>;
  if (isErrorItems) return <div>Error occurred Items</div>;

  return (
    <section className="top-sales catalog">
      <h2 className="text-center">Каталог</h2>
      {searchComponent && <div>{searchComponent}</div>}
      <CategoryBar />
      <ListItems itemsList={itemsList} />
      {isFetchingItems ? <div>Loading more data...</div> : null}
      <div>Загрузить еще</div>
    </section>
  );
};

export default Catalog;
