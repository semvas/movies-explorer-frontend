import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <span className="search__icon" />
        <div className="search__container">
          <input className="search__input" type="search" placeholder="Фильм" required />
        </div>
        <button className="search__submit-btn" type="submit" />
        <div className="search__checkbox">
          <FilterCheckbox />
          <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
