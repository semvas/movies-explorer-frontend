import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { convertMinutesToHours } from '../../utils/convertFucn';
import { IMG_URL } from '../../utils/constants';

import './MoviesCard.css';

function MoviesCard({ movie, savedMovies, createMovie, deleteMovie }) {
  const currentUser = useContext(CurrentUserContext);
  const[isSaved, setIsSaved] = useState(false);

  const location = useLocation();
  const isSavedPage = location.pathname === '/saved-movies';

  useEffect(() => {
    console.log(movie.trailer);
  }, []);

  const handleSaveBtn = () => {
    if(!isSaved) {
      createMovie(movie);
      setIsSaved(true);
    } else {
      const movieItem = savedMovies.filter((savedMovie)=> savedMovie.movieId === movie.id);
      deleteMovie(movieItem[0]._id);
      setIsSaved(false);
    }
  };

  const handleDeleteBtn = () => {
    deleteMovie(movie._id);
  }

  useEffect(() => {
    if(savedMovies.length > 0) {
      if(!isSaved) {
      setIsSaved(savedMovies.some(savedMovie=>
        savedMovie.movieId === movie.id && savedMovie.owner === currentUser._id));
      } else {
        setIsSaved(false);
      }
    }
  },[]);

  return (
    <article className={`movies-card ${isSavedPage ? 'movies-card_type_saved' : 'movies-card_type_main'}`} >
      {isSavedPage ? (
        <button
        className="movies-card__delete-btn"
        type="button"
        onClick={handleDeleteBtn}
      />
      ) : (
        <button
        className={`movies-card__save-btn ${isSaved ? 'movies-card__save-btn_saved' : ''}`}
        type="button"
        onClick={handleSaveBtn}
      >
        Сохранить
      </button>
      )}
      <a
        className="movies-card__link"
        href={movie.trailerLink || movie.trailer}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__img"
          src={`${IMG_URL+movie.image.url}`}
          alt={`Превью фильма ${movie.nameRU}`}
        />
      </a>
      <div className="movies-card__text">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__duration">{convertMinutesToHours(movie.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
