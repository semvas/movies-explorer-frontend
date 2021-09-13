import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import ProfileBtn from '../ProfileBtn/ProfileBtn';

import './Navigation.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return(
    <>
      <button className={`menu__btn ${isMenuOpen ? 'menu__close-btn' : 'menu__burger-btn'} `} onClick={handleMenuClick} />
      <nav className={`menu__auth ${isMenuOpen ? 'menu__side' : ''}`}>
        <div className="menu__container">
          <NavLink exact to="/" className="menu__film-link" activeClassName="menu__film-link_active" onClick={handleMenuClick}>
            Главная
          </NavLink>
          <NavLink to="/movies" className="menu__film-link" activeClassName="menu__film-link_active" onClick={handleMenuClick}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="menu__film-link" activeClassName="menu__film-link_active" onClick={handleMenuClick}>
            Сохраненные фильмы
          </NavLink>
        </div>
        <ProfileBtn onClick={handleMenuClick} />
      </nav>
    </>
  );
}

export default Navigation;
