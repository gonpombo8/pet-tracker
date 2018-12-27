import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import { getMe, User } from 'src/api/user';
import Dashboard from '../dashboard';

const Home = () => <div>Home</div>;

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

  renderComponent = (Component: React.ComponentType<any>) => {
    const { user } = this.state;

    return user
      ? <Component user={user} />
      : <Loading />
  }

  render() {
    return <Switch>
      <Route
        exact
        paths={['/', '/dashboard']}
        render={() => this.renderComponent(Dashboard)}
      />
      <Route
        exact
        path="/home"
        render={() => this.renderComponent(Home)}
      />
    </Switch>
  }
}
