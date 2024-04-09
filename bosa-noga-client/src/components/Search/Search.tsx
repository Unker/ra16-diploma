import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchQuery } from '../../store/searchSlice';
import s from './Search.module.css';

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        dispatch(setSearchQuery(query));
      }
    },
    [dispatch, query],
  );
  return (
    <div>
      <Form
        data-id="search-form"
        className={`form-inline ${className}`}
      >
        <Form.Control
          className={`${s.formСontrol}`}
          placeholder="Поиск"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </Form>
    </div>
  );
};

const HeaderSearch = () => (
  <Search className={` ${s.headerControlsSearchForm}`} />
);
const CatalogSearch = () => (
  <Search className={`${s.catalogSearchForm}`} />
);

export { HeaderSearch, CatalogSearch };
export default Search;
