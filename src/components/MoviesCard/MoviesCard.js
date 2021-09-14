import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({ movie }) {
  const location = useLocation();
  const isSavedPage = location.pathname === '/saved-movies'

  const [isSaved, setIsSaved] = useState(movie.saved);
  const handleSave = () => setIsSaved(!isSaved);

  return (
    <article className={`movies-card ${isSavedPage ? 'movies-card_type_saved' : 'movies-card_type_main'}`} >
      {isSavedPage ? (
        <button
        className="movies-card__delete-btn"
        type="button"
      />
      ) : (
        <button
        className={`movies-card__save-btn ${isSaved ? 'movies-card__save-btn_saved' : ''}`}
        type="button"
        onClick={handleSave}
      >
        Сохранить
      </button>
      )}
      <img
        className="movies-card__img"
        src={movie.image}
        alt={`Превью фильма ${movie.name}`}
      />
      <div className="movies-card__text">
        <h2 className="movies-card__title">{movie.name}</h2>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
