import { useState } from 'react';

import { useAuth } from '../context/Auth';

import '../styles/Register.css';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  const [error, setError] = useState(null);

  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signUp({ email, password });

    if (error) return setError(error);

    history.push('/dashboard');
  };

  return (
    <div className="register__container">
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
        <div className="register__password__container">
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
          Register
        </button>
        {error && (
          <div className="register__registerFail">
            Register Fail, Please Check Again !
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
