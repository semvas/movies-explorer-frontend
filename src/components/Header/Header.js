import { Route, Link, useLocation } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header({ loggedIn }) {
  const location = useLocation();
  const Main = location.pathname === '/';

  return(
    <Route exact path = {['/', '/movies', '/saved-movies', '/profile']}>
      <header className={`header ${Main ? 'header_grey' : 'header_white'}`}>
        <div className="header__container">
          <Logo />
          {loggedIn ? (
            <Navigation main={Main} />
          ) : (
            <nav className="menu__noauth">
              <Link to="/signup" className="menu__link menu__register">Регистрация</Link>
              <Link to="/signin" className="menu__link menu__signin">Войти</Link>
            </nav>
          )}
        </div>
      </header>
    </Route>
  );
}

export default Header;
