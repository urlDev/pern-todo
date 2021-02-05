import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';

const LoginRegister = () => {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/login" component={Login} />
      <Route exact path="/profile/register" component={Register} />
    </Switch>
  );
};

export default LoginRegister;
