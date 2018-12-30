import React from 'react';
import { capitalize } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Paper,
  SnackbarContent,
  TextField,
} from '@material-ui/core';
import { Phone as PhoneIcon } from '@material-ui/icons';

import { getPetInfoViaQr, PetUserQrcode } from 'src/api/pet';
import getPosition from 'src/helpers/get-position';
import petAvatar from 'src/helpers/pet-avatar';
import Loading from 'src/loading';

import './styles.sass'

interface Params {
  petId: string;
  qrcode: string;
}
interface PropTypes extends RouteComponentProps<Params> {
}
interface StateTypes {
  position?: Position;
  error?: string;
  user?: PetUserQrcode['user'];
  pet?: PetUserQrcode['pet'];
}

class Qrcode extends React.Component<PropTypes, StateTypes> {
  state: StateTypes = {};

  async componentDidMount() {
    const pos = getPosition();
    const { petId, qrcode } = this.props.match.params;
    const resp = getPetInfoViaQr(petId, qrcode);
    try {
      const [
        { error, position }, // pos promise response
        { user, pet }, // qrcode promise response
      ] = await Promise.all([pos, resp]);
      this.setState({
        error,
        pet,
        position,
        user,
      });
    } catch (e) {
      this.props.history.push('/');
    }
  }

  render() {
    const { error, pet, user } = this.state;

    if (!user || !pet) {
      return <Loading />;
    }

    return <div className="qrcode align-center column">
      <AppBar position="fixed" className="bar">
        <Toolbar>
          <span>PET TRACKER</span>
        </Toolbar>
      </AppBar>
      <Paper className="paper">
        {error && <SnackbarContent className="error" message={error} />}
        <Avatar
          alt="Avatar"
          src={petAvatar(pet.avatar, pet.type)}
          className="avatar"
        />
        <TextField
          className="text-field"
          defaultValue={pet.name}
          InputProps={{ readOnly: true }}
          label={`${capitalize(pet.type)} Name`}
          margin="normal"
        />
        <TextField
          className="text-field"
          defaultValue={user.name}
          InputProps={{ readOnly: true }}
          label="Name"
          margin="normal"
        />
        <TextField
          className="text-field"
          defaultValue={user.surname}
          InputProps={{ readOnly: true }}
          label="Surname"
          margin="normal"
        />
        <TextField
          className="text-field"
          defaultValue={user.phone}
          InputProps={{ readOnly: true }}
          label="Phone"
          margin="normal"
        />
        <TextField
          className="text-field"
          defaultValue={user.address}
          InputProps={{ readOnly: true }}
          label="Address"
          margin="normal"
        />
        <a className="call" href={`tel:${user.phone}`}>
          <Button
            disabled={!user.phone}
            variant="contained"
            color="primary"
            component="a"
            fullWidth
          >
            <PhoneIcon />
            <span className="text">Call {user.name}</span>
          </Button>
        </a>
      </Paper>
    </div>
  }
}

export default Qrcode;
