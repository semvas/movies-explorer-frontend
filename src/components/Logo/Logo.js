import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

import './Logo.css';

function Logo() {
  return(
    <Link className="logo" to="/">
      <img className="logo__pic" src={logo} alt="Логотип приложения" />
    </Link>
  );
}

export default Logo;
