import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '.';


export default () => <Switch>
    <Route path="/" component={Dashboard}/>
    <Route path="/pepito" component={Dashboard}/>
  </Switch>;

