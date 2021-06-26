import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditTodo from './components/EditTodo';

import { AuthProvider } from './context/Auth';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

import Layout from './components/Layout/Layout';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/edit/:editTodo" component={EditTodo} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
