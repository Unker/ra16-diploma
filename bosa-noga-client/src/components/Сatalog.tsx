import { ReactNode, useEffect, useState } from 'react';
import CategoryBar from './CategoryBar';
import { useGetItemsQuery } from '../api/itemsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ListItems from './ListItems';
import LoadMoreItems from './LoadMoreItems';

interface CatalogProps {
  searchComponent?: ReactNode;
}

const Catalog: React.FC<CatalogProps> = ({ searchComponent }) => {
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  const [offset, setOffset] = useState(0);
  const [itemsList, setItemsList] = useState<any[]>([]);
  const countLoadItems = 6;

  useEffect(() => {
    setItemsList([]);
    setOffset(0);
  }, [selectedCategory]);

  const { data: newItemsList = [],
    isFetching: isFetchingItems,
    isError: isErrorItems,
    isLoading: isLoadingItems
  } = useGetItemsQuery({ categoryId: selectedCategory, offset });

  useEffect(() => {
    if (newItemsList.length > 0) {
      setItemsList((prevItemsList) => [...prevItemsList, ...newItemsList]);
    }
  }, [newItemsList]);

  useEffect(() => {
    if (isErrorItems) {
      // Обработка ошибки
    }
  }, [isErrorItems]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + countLoadItems);
  };

  if (isLoadingItems) return <div>Loading Items...</div>;
  if (isErrorItems) return <div>Error occurred Items</div>;

  return (
    <section className="top-sales catalog">
      <h2 className="text-center">Каталог</h2>
      {searchComponent && <div>{searchComponent}</div>}
      <CategoryBar />
      <ListItems itemsList={itemsList} />
      {isFetchingItems ? <div>Loading more data...</div> : null}
      {newItemsList.length === countLoadItems ?
        <LoadMoreItems offset={offset} onLoadMore={handleLoadMore} />
        :
        null
      }
    </section>
  );
};

export default Catalog;
