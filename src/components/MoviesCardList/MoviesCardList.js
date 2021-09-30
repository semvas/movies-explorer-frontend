import { useState, useEffect } from 'react';

import MoviesCard from "../MoviesCard/MoviesCard";

import { throttle } from '../../utils/throttleFunc'; 

import {
  CARDS_MAX,
  ADD_CARDS_MAX,
  CARDS_MIDDLE,
  CARDS_MIN,
  ADD_CARDS_MIN,
} from '../../utils/constants';

import './MoviesCardList.css';

function MoviesCardList({ allMovies, savedMovies, createMovie, deleteMovie }) {
  const[width, setWidth] = useState(window.innerWidth);

  const[moviesAmount, setMoviesAmount] = useState(12);
  const[addedAmount, setAddedAmount] = useState(3);

  const[renderedMovies, setRenderedMovies] = useState([]);

  function handleResize() {
    if (width > 800) {
      setMoviesAmount(CARDS_MAX);
      setAddedAmount(ADD_CARDS_MAX);
    } else if (width > 505) {
      setMoviesAmount(CARDS_MIDDLE);
      setAddedAmount(ADD_CARDS_MIN);
    } else {
      setMoviesAmount(CARDS_MIN);
      setAddedAmount(ADD_CARDS_MIN);
    }
  }

  function handleMoreClick() {
    setRenderedMovies(allMovies.slice(0, renderedMovies.length + addedAmount));
  }

  useEffect(() => {
    handleResize();
  }, [width]);

  useEffect(() => {
      setRenderedMovies(allMovies.slice(0, moviesAmount));
  }, [allMovies, moviesAmount]);

  useEffect(() => {
    const updateWidth = throttle(() => {
      setWidth(window.innerWidth);
    }, 500);

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section className="movies-card-list">
      {!allMovies.length ? (
        <p className="movies-card-list__not-found">Ничего не найдено</p>
      ) : (
        <ul className="movies-card-list__items">
          {renderedMovies.map((item) => (
            <li className="movies-card-list__item" key={item.id || item.movieId}>
              <MoviesCard
                key={item.id || item.movieId}
                movie={item}
                savedMovies = {savedMovies}
                createMovie = {createMovie}
                deleteMovie = {deleteMovie}
              />
            </li>
          ))}
        </ul>
      )}
      {renderedMovies.length < allMovies.length ? (
        <button
          className="movies-card-list__more-btn"
          onClick={handleMoreClick}
        >
          Ещё
        </button>
        ) : null}
    </section>
  );
}

export default MoviesCardList;
