import { Route, Switch } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return(
    <Switch>
      <Route exact path={['/movies', '/saved-movies', '/']}>
        <footer className="footer">
          <div className="footer__container">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__social">
              <p className="footer__date">&#169;2021</p>
              <ul className="footer__list">
                <li className="footer__list-item"><a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank">Яндекс.Практикум</a></li>
                <li className="footer__list-item"><a className="footer__link" href="https://github.com/" target="_blank">Github</a></li>
                <li className="footer__list-item"><a className="footer__link" href="https://www.facebook.com/" target="_blank">Facebook</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </Route>
    </Switch>
  );
}

export default Footer;
