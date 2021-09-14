import './Profile.css';

function Profile() {
  return (
    <>
      <section className="profile">
        <h2 className="profile__title">Привет, Иван!</h2>
        <form className="profile__form" name="edit-form">
          <label className="profile__form-label">
            Имя
            <input
            className="profile__form-input"
            type="text"
            defaultValue="Иван"
            placeholder="Имя"
            required
            />
          </label>
          <label className="profile__form-label">
            Почта
            <input
            className="profile__form-input"
            type="email"
            defaultValue="pochta@yandex.ru"
            placeholder="E-mail"
            required
            />
          </label>
          <button className="profile__submit-button" type="submit">Редактировать</button>
        </form>
        <button className="profile__exit-button">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
