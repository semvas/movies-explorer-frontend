import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi';
import { getInitialMovies } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

import { searchMovies } from '../../utils/searchingFunc'; 
import { filterShortMovies } from '../../utils/filterShortFunc';

import './App.css';

function App() {
  const[currentUser, setCurrentUser] = useState({});
  const[loggedIn, setLoggedIn] = useState(false);
  const[token, setToken] = useState('');

  const[isAuthError, setIsAuthError] = useState(false);
  const[isRegisteredError, setIsRegisteredError] = useState(false);
  const[isEditError, setIsEditError] = useState(false);
  const[isEditSuccess, setIsEditSuccess] = useState(false);

  const[isLoading, setIsLoading] = useState(false);

  const[allMovies, setAllMovies] = useState([]);
  const[savedMovies, setSavedMovies] = useState([]);
  const[durationFiltered, setDurationFiltered] = useState([]);
  const[searchFiltered, setSearchFiltered] = useState([]);
  const[allFilteredMovies, setAllFilteredMovies] = useState([]);
  const[shortInLocal, setShortInLocal] = useState([]);

  const[isShortMovies, setIsShortMovies] = useState(false);

  const moviesFromLocalStorage = JSON.parse(
    localStorage.getItem('results')
  );

  const history = useHistory();
  const location = useLocation();

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        setToken(jwt);
        mainApi.checkToken(jwt).then(res => {
          if (res) {
            setLoggedIn(true);
            if (location.pathname === '/signin' || location.pathname === '/signup') {
              history.push('/movies');
            } else {
              history.push(location.pathname);
            }
          }
        })
        .catch(err => console.log(err));
      }
    }
  }
  
  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt === token) {
      setIsLoading(true);
      Promise.all([
        mainApi.getUserInfo(token),
        mainApi.getSavedMovies(token)
      ])
      .then(([userData,savedMovies]) => {
        setCurrentUser(userData);
        getAllMovies();
        if(savedMovies) {
          setSavedMovies(savedMovies);
        }
        setAllFilteredMovies(moviesFromLocalStorage);
        setShortInLocal(filterShortMovies(moviesFromLocalStorage));
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    }
  }, [token]);

  useEffect(()=> {
    if (isShortMovies) {
      if (searchFiltered.length === 0) {
        setAllFilteredMovies(shortInLocal);
      } else {
      setAllFilteredMovies(durationFiltered);
      }
    } else {
      if (searchFiltered.length === 0) {
        setAllFilteredMovies(moviesFromLocalStorage);
      } else {
      setAllFilteredMovies(searchFiltered);
      }
    }
  }, [isShortMovies, searchFiltered]);

  useEffect(() => {
    setDurationFiltered(filterShortMovies(searchFiltered));
  }, [searchFiltered]);

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password).then(res => {
      if (res) {
        handleAuthorize(email, password);
      }
    })
    .catch(err => {
      console.log(err);
      setIsRegisteredError(true);
    });
  }

  function handleAuthorize(email, password) {
    mainApi.authorize(email, password).then( res => {
      if (res) {
        localStorage.setItem('jwt', res.token);
        handleTokenCheck();
      }
    })
    .catch(err => {
      console.log(err);
      setIsAuthError(true);
    });
  }

  function handleSignOut() {
    setLoggedIn(false);
    setShortInLocal([]);
    localStorage.clear();
    history.push('/');
  }

  function handleUpdateUser(name, email) {
    mainApi.setUserInfo(name, email)
    .then(res => {
      setCurrentUser(res);
      setIsEditSuccess(true);
      setIsEditError(false);
      setTimeout(function removeSuccessMessage(){
        setIsEditSuccess(false);
      }, 5000);
    })
    .catch((err) => {
      console.log(err);
      setIsEditError(true);
    })
  }

  function getAllMovies() {
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      const localMoviesArr = JSON.parse(localMovies);
      if (localMoviesArr.length) {
        setAllMovies(localMoviesArr);
      }
    } else {
      getInitialMovies()
        .then((data) => {
          setAllMovies(data);
          localStorage.setItem('movies', JSON.stringify(data));
        })
        .catch(err => console.log(err));
    }
  }

  function handleSearchSubmit(keyword) {
    setIsLoading(true);
  
    const results = searchMovies(keyword, allMovies);
    
    setSearchFiltered(results);
    localStorage.setItem('results', JSON.stringify(results));

    setIsLoading(false);
  }

  function handleCheckBox() {
    setIsShortMovies(!isShortMovies);
  }

  function createMovie(movie) {
    mainApi.addMovie(movie)
      .then((movieInfo) => {
        setSavedMovies([movieInfo, ...savedMovies]);
      })
      .catch(err => console.log(err));
  }

  function deleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        const newMovies = savedMovies.filter(savedMovie=> savedMovie._id !== movieId);
        setSavedMovies(newMovies);
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Header loggedIn={loggedIn}/>
            <Switch>
              <Route path="/signin">
                <Login
                  handleAuthorize={handleAuthorize}
                  isAuthError={isAuthError} 
                />
              </Route>
              <Route path="/signup">
                <Register
                  handleRegister={handleRegister}
                  isRegisteredError={isRegisteredError}
                />
              </Route>
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedRoute
                path="/movies"
                component={Movies}
                loggedIn={loggedIn}
                allMovies={allFilteredMovies}
                savedMovies={savedMovies}
                createMovie={createMovie}
                deleteMovie={deleteMovie}
                handleCheckBox={handleCheckBox}
                isShortMovies={isShortMovies}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                handleSearchSubmit={handleSearchSubmit}
              />
              <ProtectedRoute
                path="/saved-movies"
                component={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
                handleCheckBox={handleCheckBox}
                isShortMovies={isShortMovies}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
                loggedIn={loggedIn}
                handleUpdateUser = {handleUpdateUser}
                handleSignOut = {handleSignOut}
                isEditSuccess = {isEditSuccess}
                isEditError = {isEditError}
              />
              <Route path="*">
                <NotFound history={history} />
              </Route>
            </Switch>
            <Footer />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
