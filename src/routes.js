import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/LoginPage';

const routes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default routes;
