import { Link } from 'react-router-dom';

import './Form.css';

function Form(props) {
  return (
    <form className="form" name={props.formName}>

      <label className={`form__label${props.formName === 'login' ? ' form__label_type_hidden' : ''}`} htmlFor="name">
        Имя
      </label>
      <input
        type="text"
        className={`form__input${props.formName === 'login' ? ' form__input_type_hidden' : ''}`}
        name="name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        id="name"
        required
      />
      <span
        className={`form__input-error${props.formName === 'login' ? ' form__input-error_type_hidden' : ''}`}
        id="name-error"
      >
        Что-то пошло не так...
      </span>

      <label className="form__label" htmlFor="email">
        E-mail
      </label>
      <input
        type="email"
        className="form__input"
        name="email"
        placeholder="Ваш E-mail"
        id="email"
        required
      />
      <span className="form__input-error" id="email-error">
        Что-то пошло не так...
      </span>

      <label className="form__label" htmlFor="password">
        Пароль
      </label>
      <input
        type="password"
        className="form__input form__input_type_error"
        name="password"
        placeholder="Введите пароль"
        id="password"
        required
      />
      <span className="form__input-error" id="password-error">
        Что-то пошло не так...
      </span>

      <button
        className={`form__btn ${props.formName === 'login' ? ' form__btn_type_padded' : ''}`} type="submit">
        {props.btnTitle}
      </button>

      <p className="form__question">
        {props.question}{' '}
        <Link to={props.linkTo} className="form__link">
          {props.linkText}
        </Link>
      </p>
    </form>
  );
}

export default Form;
