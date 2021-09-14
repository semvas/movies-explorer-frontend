import NavTab from '../NavTab/NavTab';

import promo from '../../images/promo.svg';

import './Promo.css';

function Promo() {
  return(
    <section className="promo">
      <div className="promo__container">
        <div className="promo__info">
          <h1 className="promo__header">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <NavTab />
        </div>
        <img className="promo__img" src={promo} alt="Промо-логотип" />
      </div>
    </section>
  );
}

export default Promo;
