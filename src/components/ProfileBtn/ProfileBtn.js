import { Link } from 'react-router-dom';

import './ProfileBtn.css';


function ProfileBtn({ onClick }) {
  return (
    <Link to="/profile" className="profile-btn" onClick={onClick}>
      Аккаунт
      <div className="profile-btn__img" />
    </Link>
  );
}

export default ProfileBtn;
