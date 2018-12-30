import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Pet, uploadAvatar } from 'src/api/pet';
import { withCache } from 'src/helpers/with-cache';
import petAvatar from 'src/helpers/pet-avatar';
import Qrcode from './qrcode';

interface PropTypes {
  classes: { [key: string]: string };
  onChange: (p: Partial<Pet>) => void;
  value: Pet;
}

interface StateTypes {
  modal: 'qrcode' | 'edit' | 'remove' | '';
}

class PetCard extends React.Component<PropTypes, StateTypes> {
  state: StateTypes = { modal: '' };

  inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  handleClickPhoto = () => {
    if (!this.inputRef.current) return;

    this.inputRef.current.click();
  }

  handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, value } = this.props;
    const file = e.target.files && e.target.files[0];
    const backupAvatar = value.avatar;

    if (!file) return;
    onChange({ avatar: URL.createObjectURL(file) });
    try {
      const { avatar } = await uploadAvatar(value.username, file);
      onChange({ avatar });
    } catch (e) {
      onChange({ avatar: backupAvatar });
    }
  }

  handleHideModal = () => this.setState({ modal: '' });

  handleOpenModal = withCache<StateTypes['modal'], () => void>((key) => () => {
    this.setState({ modal: key });
  });

  renderModal = () => {
    const { modal } = this.state;
    const { value } = this.props;

    switch (modal) {
      case 'qrcode':
        return <Qrcode
          onHide={this.handleHideModal}
          pet={value}
        />
      default:
        return null;
    }
  }

  render() {
    const { classes, value } = this.props;
    return <div className="pet-card">
      {this.renderModal()}
      <Card className={classes.card}>
        <input
          accept="image/*"
          className={classes.input}
          onChange={e => this.handleChange(e)}
          ref={this.inputRef}
          type="file"
        />
        <CardMedia
          onClick={this.handleClickPhoto}
          className={classes.media}
          image={petAvatar(value.avatar, value.type)}
          title={value.name}
        />
        <CardContent className="card-content">
          <span>{value.name}</span>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={this.handleOpenModal('qrcode')}
          >
            QR Code
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={this.handleOpenModal('edit')}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={this.handleOpenModal('remove')}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </div>
  }
}

const styles = {
  card: {
    maxWidth: 250,
  },
  input: {
    visibility: 'hidden' as 'hidden',
  },
  media: {
    cursor: 'pointer',
    height: 180,
    backgroundSize: 180,
  },
};

export default withStyles(styles)(PetCard);
