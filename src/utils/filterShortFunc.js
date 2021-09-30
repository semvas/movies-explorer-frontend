import { SHORT_FILM_DURATION  } from '../utils/constants';

export function filterShortMovies(movies) {
  return movies.filter((item) => item.duration < SHORT_FILM_DURATION );
};
