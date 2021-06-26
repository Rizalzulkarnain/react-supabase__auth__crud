import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../context/Auth';

import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  const [error, setError] = useState(null);

  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn({ email, password });
    const { error } = await signIn({ email, password });

    if (error) return setError(error);

    history.push('/dashboard');
  };

  return (
    <div className="login__container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="login__password__container">
          <label>Password: </label>
          <div>
            <input
              type={check ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="checkbox"
            value={check}
            onChange={() => setCheck(!check)}
          />
        </div>
        <button
          type="submit"
          disabled={!email && !password}
          className="register__button"
        >
          Login
        </button>

        {error && (
          <div className="login__loginFail">
            Login Fail, Please Check Again !
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
