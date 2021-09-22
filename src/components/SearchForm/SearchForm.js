import { useState, useEffect } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({ shortMovies, handleCheckBox, searchSubmit }) {
  const [keyword, setKeyword] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error === '') {
      setIsRequired(false);
    }
  }, [error, keyword]);

  function handleKeyword(evt) {
    setError('');
    setKeyword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (keyword === '') {
      setIsRequired(true);
      setError('Нужно ввести ключевое слово');
    } else {
      searchSubmit(keyword);
    }
  };
  
  return (
    <div className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <span className="search__icon" />
        <div className="search__container">
          <input
            className="search__input"
            type="search"
            value={keyword}
            placeholder="Фильм"
            onChange={handleKeyword}
            required
          />
        </div>
        <button className="search__submit-btn" type="submit" />
        <div className="search__checkbox">
          <FilterCheckbox shortMovies={shortMovies} handleCheckBox={handleCheckBox}/>
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </form>
      {error && isRequired && <span className="search__error">{error}</span>}
    </div>
  );
}

export default SearchForm;
