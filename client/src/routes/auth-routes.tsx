import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { getMe, User } from 'src/api/user';
import Dashboard from '../dashboard';
import SideBar from '../sidebar';

interface State {
  user: User | null;
}

const Loading = () => <div>Loading</div>;

export default class AuthRoutes extends React.Component<RouteComponentProps> {
  state: State = { user: null };

  async componentDidMount() {
    try {
      const user = await getMe();

      this.setState({ user });
    } catch (_) {
      const { history, location } = this.props;

      history.push(`/signin?returnUrl=${location.pathname}`);
    }
  }

  renderComponent = (
    Component: React.ComponentType<any>,
    withSideBar: boolean = true,
  ) => {
    const { user } = this.state;

    if (!user) {
      return <Loading />;
    }

    const C = () => <Component {...this.props} user={user} />;

    return withSideBar
      ? <SideBar {...this.props} user={user}>
          <C />
        </SideBar>
      : <C />
  }

  render() {
    return <Switch>
      <Route
        exact
        path='/'
        render={() => this.renderComponent(Dashboard)}
      />
      <Route
        exact
        path='/settings'
        render={() => this.renderComponent(Loading)}
      />
      <Route render={() => this.renderComponent(Dashboard)} />
    </Switch>
  }
}
