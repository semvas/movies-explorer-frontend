import MoviesCard from "../MoviesCard/MoviesCard";

import movies from "../../utils/dataMovies";

import './MoviesCardList.css';

function MoviesCardList() {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {movies.map((item) => (
          <li className="movies-card-list__item" key={movies.index}>
            <MoviesCard
              key={movies.index}
              movie={item}
            />
          </li>
        ))}
      </ul>
      <button className="movies-card-list__more-btn">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
