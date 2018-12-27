import React from 'react';

import {
  Button,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  p: {
    margin: '1rem',
    fontSize: '1.2rem',
  }
};

interface PropTypes {
  classes: { [key: string]: string };
}

class PetCard extends React.Component<PropTypes> {
  render() {
    const { classes } = this.props;
    return <div className="add-pet">
      <Button variant="contained" >
          <p className={classes.p}>
            ADD NEW PET
          </p>
          <AddCircleIcon />
      </Button>
    </div>
  }
}

export default withStyles(styles)(PetCard);
