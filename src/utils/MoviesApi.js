import { MOVIES_URL } from '../utils/constants';

export function getInitialMovies() {
  return fetch(MOVIES_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}