import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

import './SavedMovies.css';

function Movies() {
  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm />
        <MoviesCardList />
      </div>
    </main>
  );
}

export default Movies;
