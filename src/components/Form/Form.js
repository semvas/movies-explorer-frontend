import { Route, Link } from 'react-router-dom';

import './Form.css';

function Form({
  formName,
  btnTitle,
  question,
  linkTo,
  linkText,
  formData,
  onSubmit,
  isRegisteredError,
  isAuthError
}) {
  const {values, handleChange, errors, isValid, onFocus} = formData;

  return (
    <form className="form" name={formName} noValidate onSubmit={onSubmit}>
        <Route path="/signup">
          <label className="form__label" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            className={`form__input${errors.name ? ' form__input_type_error' : ''}`}
            name="name"
            placeholder="Ваше имя"
            minLength="2"
            maxLength="40"
            id="name"
            required
            onChange={handleChange}
            onFocus={onFocus}
            value={values.name || ''}
          />
          <span className="form__input-error" id="name-error">
            {errors.name}
          </span>
        </Route>

        <label className="form__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          className={`form__input ${errors.email ? ' form__input_type_error' : ''}`}
          name="email"
          placeholder="Ваш E-mail"
          id="email"
          required
          onChange={handleChange}
          onFocus={onFocus}
          value={values.email || ''}
        />
        <span className="form__input-error" id="email-error">
          {errors.email}
        </span>

        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          type="password"
          className={`form__input ${errors.password ? ' form__input_type_error' : ''}`}
          name="password"
          placeholder="Введите пароль"
          id="password"
          minLength="4"
          required
          onChange={handleChange}
          onFocus={onFocus}
          value={values.password || ''}
        />
        <span className="form__input-error" id="password-error">
          {errors.password}
        </span>

        <div className='form__input-container'>
          {isRegisteredError && <p className='form__text-error'>При регистрации произошла ошибка</p>}
          {isAuthError && <p className='form__text-error'>Во время авторизации произошла ошибка</p>}

          <button
            className="form__btn"
            type="submit"
            disabled={!isValid}
          >
            {btnTitle}
          </button>

          <p className="form__question">
            {question}{' '}
            <Link to={linkTo} className="form__link">
              {linkText}
            </Link>
          </p>
        </div>
    </form>
  );
}

export default Form;
