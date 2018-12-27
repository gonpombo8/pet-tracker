import React from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { uploadAvatar } from 'src/api/pet';

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
}

class PetCard extends React.Component<PropTypes> {
  state = { url: '/placeholder.jpg' };

  inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  handleClickPhoto = () => {
    if (!this.inputRef.current) return;

    this.inputRef.current.click();
  }

  handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    this.setState({ url: URL.createObjectURL(file) });
    await uploadAvatar('petId', file);
  }

  render() {
    const { classes } = this.props;
    const { url } = this.state;
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
          image={url}
          title="Contemplative Reptile"
        />
        <CardContent>
          Lizard
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
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
