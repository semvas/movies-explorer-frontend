import './NotFound.css';

function NotFound({ history }) {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__description">Страница не найдена</p>
      <button className='not-found__back' type='button' onClick={()=>history.go(-2)}>Назад</button>
    </section>
  );
}

export default NotFound;
