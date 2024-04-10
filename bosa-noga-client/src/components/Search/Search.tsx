import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import s from './Search.module.css';
import { setSearchQuery } from '../../store/searchSlice';

const Search = (): JSX.Element => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const headerQuery = location.state?.headerSearchQuery;
    if (headerQuery) {
      setQuery(headerQuery);
    }
  }, [location]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
  };

  return (
    <div>
      <Form
        data-id="search-form"
        className={`form-inline ${s.catalogSearchForm}`}
        onSubmit={handleSearchFormSubmit}
      >
        <Form.Control
          className={`${s.formСontrol}`}
          placeholder="Поиск"
          value={query}
          onChange={handleSearchChange}
        />
      </Form>
    </div>
  );
};

export default Search;
