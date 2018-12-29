import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { isEqual, pick } from 'lodash';

import { User, updateUser } from 'src/api/user';
import { withCache } from 'src/helpers/with-cache';

import './styles.sass';

interface PropTypes {
  classes: any;
  user: User;
  onChange: (u: User) => void;
}

interface StateTypes {
  value: User;
}

type ChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => void

const PROPS: (keyof User)[] = ['name', 'surname', 'phone', 'address'];

class Settings extends React.PureComponent<PropTypes> {
  state: StateTypes = { value: this.props.user };

  mergeValue = (partialUser: Partial<User>) =>
    this.setState({ value: { ...this.state.value, ...partialUser }});

  handleChange = withCache<keyof User, ChangeFn>(
    key => (e: React.ChangeEvent<HTMLInputElement>) =>
      this.mergeValue({ [key]: e.target.value })
  )

  handleClick = async () => {
    const { user } = this.props;
    const { value } = this.state;
    this.props.onChange({ ...user, ...value });
    await updateUser(pick(value, PROPS));
  }

  render() {
    const { value } = this.state;
    return <div className="settings align-center column">
      <TextField
        className="text-field"
        defaultValue={value.name}
        label="NAME"
        onChange={this.handleChange('name')}
      />
      <TextField
        className="text-field"
        defaultValue={value.surname}
        label="SURNAME"
        onChange={this.handleChange('surname')}
      />
      <TextField
        className="text-field"
        defaultValue={value.email}
        label="EMAIL"
        disabled
      />
      <TextField
        className="text-field"
        defaultValue={value.phone}
        helperText="This will be provided when someone scans a qr code"
        label="PHONE"
        onChange={this.handleChange('phone')}
      />
      <TextField
        className="text-field"
        defaultValue={value.address}
        helperText="This will be provided when someone scans a qr code"
        label="ADDRESS"
        onChange={this.handleChange('address')}
      />
      <Button
        color="primary"
        disabled={isEqual(this.props.user, value)}
        onClick={this.handleClick}
        type="submit"
        variant="contained"
      >
        Save Changes
      </Button>
    </div>;
  }
}
export default Settings;
