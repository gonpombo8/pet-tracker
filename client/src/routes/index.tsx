import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Bye from '../bye';
import Qrcode from '../qrcode';
import Signin from '../signin';
import Signup from '../signup';
import history from '../history';
import AuthRoutes from './auth-routes';


export default () => <Router history={history}>
    <Switch>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/bye" component={Bye} />
      <Route exact path="/qrcode/:petId/:qrcode" component={Qrcode} />
      <Route path="/" component={AuthRoutes} />
    </Switch>
  </Router>;
