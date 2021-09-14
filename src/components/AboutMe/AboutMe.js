import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';

import photo from '../../images/photo.jpg';

import './AboutMe.css';

function AboutMe() {
  return(
    <section className="about-me">
      <div className="about-me__container">
        <SectionTitle title="Студент" />
        <article className="person">
            <div className="person__info">
              <h3 className="person__name">Иван</h3>
              <p className="person__position">Фронтенд-разработчик, 33 года</p>
              <p className="person__description">
                Я родился и живу в Алматы. После окончания курса, планирую и далее продолжать изучение аспектов веб-разработки и набираться опыта уже в живых проектах.
              </p>
              <ul className="person__links-list">
                <li>
                  <a
                    className="person__link"
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="person__link"
                    href="https://github.com/semvas"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <img src={photo} className="person__photo" alt="Фотография ученика" />
          </article>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
