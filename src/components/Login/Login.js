import Logo from '../Logo/Logo';
import Form from '../Form/Form';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Login.css';

function Login({handleAuthorize, isAuthError}) {
  const formWithValidation = useFormWithValidation();
  const { email, password } = formWithValidation.values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAuthorize(email, password);
    formWithValidation.resetForm();
  }

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__header">
          <Logo />
          <h2 className="login__greeting">Рады видеть!</h2>
        </div>
        <Form
          formName="login"
          btnTitle="Войти"
          question="Ещё не зарегистрированы?"
          linkTo="/signup"
          linkText="Регистрация"
          formData = {formWithValidation}
          onSubmit={handleSubmit}
          isAuthError={isAuthError}
        />
      </div>
    </section>
  );
}

export default Login;
