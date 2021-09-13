import Logo from '../Logo/Logo';
import Form from '../Form/Form';

import './Login.css';

function Login() {
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
        />
      </div>
    </section>
  );
}

export default Login;
