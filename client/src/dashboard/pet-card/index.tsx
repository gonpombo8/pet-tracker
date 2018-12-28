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
import { User } from 'src/api/user';
import { withCache } from 'src/helpers/with-cache';
import Qrcode from './qrcode';

interface PropTypes {
  classes: { [key: string]: string };
  onChange: (p: Partial<Pet>) => void;
  value: Pet;
  user: User;
}

interface StateTypes {
  modal: 'qrcode' | 'edit' | 'remove' | '';
}

const avatarPlaceholder = (type: Pet['type']) => `/${type}-placeholder.jpg`;

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
    const { user, value } = this.props;

    switch (modal) {
      case 'qrcode':
        return <Qrcode
          onHide={this.handleHideModal}
          pet={value}
          user={user}
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
          image={value.avatar || avatarPlaceholder(value.type)}
          title={value.name}
        />
        <CardContent>
          Name: { value.name }
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
    height: 200,
    backgroundSize: 200,
  },
};

export default withStyles(styles)(PetCard);
