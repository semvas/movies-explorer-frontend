import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'; 

import './Movies.css';

function Movies({
  allMovies,
  savedMovies,
  createMovie,
  deleteMovie,
  handleCheckBox, 
  isShortMovies,
  isLoading,
  handleSearchSubmit
}) {
  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          shortMovies={isShortMovies}
          handleCheckBox={handleCheckBox}
          searchSubmit={handleSearchSubmit}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {allMovies === null ? (
              <p className="movies__message">Введите в поиск ключевое слово</p>
            ) : (
              <MoviesCardList
                allMovies={allMovies}
                savedMovies = {savedMovies}
                createMovie = {createMovie}
                deleteMovie={deleteMovie}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Movies;
