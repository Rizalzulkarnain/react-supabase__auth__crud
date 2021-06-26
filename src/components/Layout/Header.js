import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

import '../../styles/Header.css';

const Header = () => {
  const { user, signOut } = useAuth();

  const history = useHistory();
  const handleClickLogout = () => {
    signOut();
    history.push('/');
  };

  return (
    <div className="header__wrapper">
      <div>
        {user && user.email}
        {!user && (
          <div>
            <Link to="/">
              <div>Home</div>
            </Link>
          </div>
        )}
      </div>

      <div className="header__container">
        {user && (
          <div onClick={handleClickLogout} className="header__logout">
            Logout
          </div>
        )}

        {!user && (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div className="header__register">
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
