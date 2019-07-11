import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/LoginPage';


// retornar o componente
const RotaPrivada = (props) => {
  // const { permition, ...props } = props;
  // checar o token
  if (localStorage.getItem('token') === null) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />
};

const routes = () => {
  return (
    <Switch>
      <RotaPrivada path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default routes;
