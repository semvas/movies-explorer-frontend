import { BASE_URL } from '../utils/constants';

class MainApi {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
  }

  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(this._handleResponse)
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
  }

  addMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: movie.country || 'No data',
        director: movie.director || 'No data',
        duration: movie.duration || 'No data',
        year: movie.year || 'No data',
        description: movie.description || 'No data',
        image: movie.image,
        trailer: movie.trailerLink || 'No data',
        thumbnail: movie.thumbnail || 'No data',
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || 'No name'
      })
    })
    .then(this._handleResponse)
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(this._handleResponse);
  }
  
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._handleResponse);
  }
  
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: BASE_URL
});
