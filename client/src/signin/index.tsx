import React from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, ErrorOutlined } from '@material-ui/icons'
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Input,
  Paper,
} from '@material-ui/core';

import { authenticate } from 'src/api/user';
import { withCache } from '../helpers/with-cache';
import isEmail from '../helpers/is-email';
import history from '../history';
import './styles.sass';

interface PropTypes {}
interface StateTypes {
  email: string;
  password: string;
  error: boolean;
}
type ChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => void

const PASSWORD_LENGTH = 6;
const validPassword = (password: string) => password.length >= PASSWORD_LENGTH;

class SignIn extends React.PureComponent<PropTypes, StateTypes> {
  state: StateTypes = {
    email: '',
    password: '',
    error: false,
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await authenticate(email, password)
      history.push('/');
    } catch(_) {
      this.setState({ error: true });
    }
  }

  handleChange = withCache<'password'|'email', ChangeFn>(
    key => (e: React.ChangeEvent<HTMLInputElement>) =>
      this.setState({
        [key]: e.target.value,
        error: false,
      } as Pick<StateTypes, keyof StateTypes>)
  )

  disabled = () => {
    const { email, password } = this.state;
    return !isEmail(email) || !validPassword(password)
  }

  handleError = () => this.setState({ error: false });

  render() {
    const { email, error, password } = this.state;

    return <div className="signin">
      <Paper className="paper">
        <Avatar className="avatar" color="primary">
          <LockOutlined />
        </Avatar>
        <p>Pet Tracker Sports</p>
        <form onSubmit={this.handleSubmit}>
          <FormControl fullWidth className="form-control">
            <InputLabel htmlFor="email" error={error}>
              Email
            </InputLabel>
            <Input
              autoComplete="email"
              autoFocus
              id="email"
              name="email"
              onChange={this.handleChange('email')}
              value={email}
            />
          </FormControl>
          <FormControl fullWidth className="form-control">
            <InputLabel htmlFor="password" error={error}>
              Password
            </InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange('password')}
              value={password}
            />
            <Button
              disabled={this.disabled() || error}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign in
            </Button>
          </FormControl>
        </form>
        {error
          ? <Chip
              className="chip"
              icon={<ErrorOutlined />}
              label="There was an error. Try again"
              onDelete={this.handleError}
              color="secondary"
            />
          : <Link to="/signup" className="link">
            New user? Sign up
          </Link>
        }
      </Paper>
    </div>;
  }
}

export default SignIn
