import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../context/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  console.log('private Route', user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Redirect to="/" /> : <Component {...props} />;
      }}
    />
  );
};

export { PrivateRoute };
