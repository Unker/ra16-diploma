import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGetItemsQuery } from '../api/itemsApi';
import { RootState } from '../store/store';
import CategoryBar from './CategoryBar.tsx';
import ListItems from './ListItems.tsx';
import LoadMoreItems from './LoadMoreItems.tsx';
import { IItemShort } from './types';
import { setSearchQuery } from '../store/searchSlice';

interface CatalogProps {
  searchComponent?: ReactNode;
}

const Catalog: React.FC<CatalogProps> = ({ searchComponent }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory);
  const search = useSelector((state: RootState) => state.search);
  const [offset, setOffset] = useState(0);
  const [itemsList, setItemsList] = useState<IItemShort[]>([]);
  const location = useLocation();
  const countLoadItems = 6;

  const {
    data: newItemsList = [],
    isFetching: isFetchingItems,
    isError: isErrorItems,
    isLoading: isLoadingItems,
  } = useGetItemsQuery({ categoryId: selectedCategory, offset, q: search.searchQuery });

  useEffect(() => {
    // установка строки поиска при межстраничной навигации
    if (location.state?.headerSearchQuery) {
      const { headerSearchQuery } = location.state;
      dispatch(setSearchQuery(headerSearchQuery));
    }
  }, [location, dispatch]);

  useEffect(() => {
    setItemsList([]);
    setOffset(0);
  }, [selectedCategory, search]);

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
      {newItemsList.length === countLoadItems
        ? <LoadMoreItems offset={offset} onLoadMore={handleLoadMore} />
        : null
      }
    </section>
  );
};

export default Catalog;
