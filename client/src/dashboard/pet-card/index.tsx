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

interface PropTypes {
  classes: { [key: string]: string };
  onChange: (p: Partial<Pet>) => void;
  value: Pet;
}

const avatarPlaceholder = (type: Pet['type']) => `/${type}-placeholder.jpg`;

class PetCard extends React.Component<PropTypes> {
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

  render() {
    const { classes, value } = this.props;
    return <div className="pet-card">
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
          title="Contemplative Reptile"
        />
        <CardContent>
          Name: { value.name }
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            QR Code
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary">
            Remove
          </Button>
        </CardActions>
      </Card>
    </div>
  }
}

export default withStyles(styles)(PetCard);
