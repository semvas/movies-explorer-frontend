import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { searchMovies } from '../../utils/searchingFunc'; 
import { filterShortMovies } from '../../utils/filterShortFunc';

import './SavedMovies.css';

function SavedMovies({
  savedMovies,
  deleteMovie,
  handleCheckBox, 
  isShortMovies,
  isLoading,
  setIsLoading,
}) {

  const[durationSavedFiltered, setdurationSavedFiltered] = useState([]);
  const[searchSavedFiltered, setSearchSavedFiltered] = useState(savedMovies);
  const[allSaveFilteredMovies, setAllSaveFilteredMovies] = useState(savedMovies);

  useEffect(() => {
    setdurationSavedFiltered(filterShortMovies(savedMovies))
  }, [isShortMovies]);

  useEffect(()=> {
    if (isShortMovies && searchSavedFiltered) {
      setAllSaveFilteredMovies(durationSavedFiltered);
    } else {
      setAllSaveFilteredMovies(searchSavedFiltered);
    }
  }, [isShortMovies, searchSavedFiltered]);

  useEffect(() => {
    if (savedMovies.length < allSaveFilteredMovies.length) {
      setAllSaveFilteredMovies(savedMovies);
    } 
  }, [savedMovies]);

  function handleSearchSubmit(keyword) {
    setIsLoading(true);
  
    const results = searchMovies(keyword, savedMovies);
    
    setAllSaveFilteredMovies(results);
    setSearchSavedFiltered(results);
    
    setIsLoading(false);
  };

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
      <SearchForm
          shortMovies={isShortMovies}
          handleCheckBox={handleCheckBox}
          searchSubmit={handleSearchSubmit}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {savedMovies.length === 0 ? (
              <p className="saved-movies__message">У вас пока нет сохраненных фильмов</p>
            ) : (
              <MoviesCardList
                allMovies={allSaveFilteredMovies}
                savedMovies = {savedMovies}
                deleteMovie={deleteMovie}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default SavedMovies;
