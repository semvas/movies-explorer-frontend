import Logo from '../Logo/Logo';
import Form from '../Form/Form';

import './Register.css';

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <div className="register__header">
          <Logo />
          <h2 className="register__greeting">Добро пожаловать!</h2>
        </div>
        <Form
          formName="register"
          btnTitle="Зарегистрироваться"
          question="Уже зарегистрированы?"
          linkTo="/signin"
          linkText="Войти"
        />
      </div>
    </section>
  );
}

export default Register;
