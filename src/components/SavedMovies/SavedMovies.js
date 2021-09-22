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
  isInitialMsg,
  setIsLoading,
  setInitialMsg
}) {

  const[durationFiltered, setDurationFiltered] = useState([]);
  const[searchFiltered, setSearchFiltered] = useState(savedMovies);
  const[allFilteredMovies, setAllFilteredMovies] = useState(savedMovies);

  useEffect(() => {
    setDurationFiltered(filterShortMovies(savedMovies))
  }, [isShortMovies]);

  useEffect(()=> {
    if(isShortMovies && searchFiltered) {
      setAllFilteredMovies(durationFiltered);
    } else {
      setAllFilteredMovies(searchFiltered);
    }
  }, [isShortMovies, searchFiltered]);
  
  useEffect(() => {
    if (savedMovies.length > 0) {
      setInitialMsg(false);
    } else {
      setInitialMsg(true);
    }
  }, [isShortMovies, savedMovies]);

  useEffect(() => {
    if (savedMovies.length < allFilteredMovies.length) {
      setAllFilteredMovies(savedMovies);
    } 
  }, [savedMovies]);

  function handleSearchSubmit(keyword) {
    setIsLoading(true);
  
    const results = searchMovies(keyword, savedMovies);
    
    setAllFilteredMovies(results);
    setSearchFiltered(results);
    
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
            {isInitialMsg ? (
              <p className="saved-movies__message">У вас пока нет сохраненных фильмов</p>
            ) : (
              <MoviesCardList
                allMovies={allFilteredMovies}
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
