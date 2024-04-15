import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGetItemsQuery } from '../api/itemsApi';
import { RootState } from '../store/store';
import CategoryBar from './CategoryBar.tsx';
import ListItems from './ListItems.tsx';
import LoadMoreItems from './LoadMoreItems.tsx';
import Preloader from './Preloader/Preloader.tsx';
import { IItemShort } from './types';
import { setSearchQuery } from '../store/searchSlice';
import getRtkErrorMessage from '../utils/getRtkErrorMessage';
import RetryButton from './RetryButton/RetryButton.tsx';

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
    isFetching,
    isError,
    isLoading,
    error,
    refetch,
  } = useGetItemsQuery({ categoryId: selectedCategory, offset, q: search.searchQuery });

  useEffect(() => {
    refetch();
    setItemsList([]);
    setOffset(0);
  }, [location.pathname, selectedCategory, search.searchQuery, refetch]);

  useEffect(() => {
    // установка строки поиска при межстраничной навигации
    if (location.state?.headerSearchQuery) {
      const { headerSearchQuery } = location.state;
      dispatch(setSearchQuery(headerSearchQuery));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (newItemsList.length > 0) {
      setItemsList((prevItemsList) => [...prevItemsList, ...newItemsList]);
    }
  }, [newItemsList]);

  useEffect(() => {
    if (error) {
      const errMsg = getRtkErrorMessage(error);
      console.log(errMsg);
    }
  }, [error]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (error) {
      intervalId = setInterval(() => {
        refetch();
      }, 15000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [error, refetch]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + countLoadItems);
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {searchComponent && <div>{searchComponent}</div>}
      <CategoryBar />
      <ListItems itemsList={itemsList} />
      {(isLoading || isFetching) && <Preloader />}
      {!(isLoading || isFetching) && isError && (
        <RetryButton refetch={refetch} />
      )}
      {!(isLoading || isFetching) && (newItemsList?.length === countLoadItems) && (
        <LoadMoreItems
          offset={offset}
          countLoadItems={countLoadItems}
          onLoadMore={handleLoadMore}
        />
      )}
    </section>
  );
};

export default Catalog;
