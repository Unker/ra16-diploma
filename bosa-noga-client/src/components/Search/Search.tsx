import React from 'react';
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div>
      <Form
        data-id="search-form"
        className={`form-inline ${className}`}
      >
        <Form.Control
          className={`${s.formСontrol}`}
          placeholder="Поиск"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
    </div>
  )
};

const HeaderSearch = () => (
  <Search className={`invisible ${s.headerControlsSearchForm}`} />
);
const CatalogSearch = () => (
  <Search className={`${s.catalogSearchForm}`} />
);

export { HeaderSearch, CatalogSearch };
export default Search;
