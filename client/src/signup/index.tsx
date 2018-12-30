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

import { createUser } from 'src/api/user';
import { withCache } from '../helpers/with-cache';
import isEmail from '../helpers/is-email';
import history from '../history';
import './styles.sass';

interface PropTypes {}
interface StateTypes {
  email: string;
  error: boolean;
  name: string;
  password: string;
  surname: string;
}
type ChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => void

const PASSWORD_LENGTH = 6;
const validPassword = (password: string) => password.length >= PASSWORD_LENGTH;

class SignIn extends React.PureComponent<PropTypes, StateTypes> {
  state: StateTypes = {
    email: '',
    error: false,
    name: '',
    password: '',
    surname: '',
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, surname } = this.state;
    try {
      await createUser({ email, password, name, surname })
      history.push('/dashboard');
    } catch(_) {
      this.setState({ error: true });
    }
  }

  handleChange = withCache<keyof StateTypes, ChangeFn>(
    key => (e: React.ChangeEvent<HTMLInputElement>) =>
      this.setState({
        [key]: e.target.value,
        error: false,
      } as Pick<StateTypes, keyof StateTypes>)
  )

  disabled = () => {
    const {
      email,
      name,
      password,
      surname,
    } = this.state;
    return !isEmail(email) || !validPassword(password) || !name || !surname
  }

  handleError = () => this.setState({ error: false });

  render() {
    const {
      email,
      error,
      name,
      password,
      surname,
    } = this.state;

    return <div className="signup">
      <Paper className="paper">
        <Avatar className="avatar" color="primary">
          <LockOutlined />
        </Avatar>
        <p>Create new account</p>
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
            <InputLabel htmlFor="name" error={error}>
              Name
            </InputLabel>
            <Input
              autoComplete="name"
              id="name"
              name="name"
              onChange={this.handleChange('name')}
              value={name}
            />
          </FormControl>
          <FormControl fullWidth className="form-control">
            <InputLabel htmlFor="surname" error={error}>
              Surname
            </InputLabel>
            <Input
              autoComplete="surname"
              id="surname"
              name="surname"
              onChange={this.handleChange('surname')}
              value={surname}
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
              disabled={this.disabled()}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Create Account
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
          : <Link to="/signin" className="link">
              Already have an account? Sign in.
            </Link>
        }
      </Paper>
    </div>;
  }
}

export default SignIn
