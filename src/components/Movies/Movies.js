import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'; 

import { searchMovies } from '../../utils/searchingFunc'; 
import { filterShortMovies } from '../../utils/filterShortFunc';

import './Movies.css';

function Movies({
  allMovies,
  savedMovies,
  createMovie,
  deleteMovie,
  handleCheckBox, 
  isShortMovies,
  isLoading,
  isInitialMsg,
  setIsLoading,
  setInitialMsg
}) {

  const[durationFiltered, setDurationFiltered] = useState([]);
  const[searchFiltered, setSearchFiltered] = useState([]);
  const[allFilteredMovies, setAllFilteredMovies] = useState([]);

  useEffect(() => {
    const localResults = localStorage.getItem('results');
    if (localResults) {
      setAllFilteredMovies(JSON.parse(localResults));
    }
  }, []);

  useEffect(() => {
    setDurationFiltered(filterShortMovies(searchFiltered))
  }, [searchFiltered]);

  useEffect(()=> {
    if(isShortMovies && searchFiltered) {
      setAllFilteredMovies(durationFiltered);
    } else {
      setAllFilteredMovies(searchFiltered);
    }
  }, [isShortMovies, searchFiltered]);

  function handleSearchSubmit(keyword) {
    setIsLoading(true);
  
    const results = searchMovies(keyword, allMovies);
    
    setSearchFiltered(results);
    localStorage.setItem('results', JSON.stringify(results));
    
    setInitialMsg(false);
    setIsLoading(false);
  }

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
            {isInitialMsg ? (
              <p className="movies__message">Введите в поиск ключевое слово</p>
            ) : (
              <MoviesCardList
                allMovies={allFilteredMovies}
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
