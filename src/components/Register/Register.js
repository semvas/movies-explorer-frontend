import Logo from '../Logo/Logo';
import Form from '../Form/Form';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Register.css';

function Register({ handleRegister, isRegisteredError }) {
  const formWithValidation = useFormWithValidation();
  const { name, email, password } = formWithValidation.values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(name, email, password);
    formWithValidation.resetForm();
  }

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
          formData = {formWithValidation}
          onSubmit = {handleSubmit}
          isRegisteredError = {isRegisteredError}
        />
      </div>
    </section>
  );
}

export default Register;
