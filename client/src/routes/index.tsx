import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Signin from '../signin';
import Signup from '../signup';
import NotFound from '../errors/not-found';
import history from '../history';
import AuthRoutes from './auth-routes';


export default () => <Router history={history}>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={AuthRoutes} />
      <Route render={NotFound} />
    </Switch>
  </Router>;
