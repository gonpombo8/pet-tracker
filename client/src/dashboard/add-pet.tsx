import React from 'react';
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Input,
  NativeSelect,
  Typography,
} from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { createPet, Pet } from 'src/api/pet';
import { withCache } from 'src/helpers/with-cache';

const styles = (theme: any) => ({
  button: {
    bottom: '-3rem',
    width: 'fit-content',
  },
  fontSize: {
    fontSize: '1.4rem',
  },
  p: {
    margin: '1rem',
    fontSize: '1.2rem',
  },
  modalContainer: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  },
  modal: {
    position: 'absolute' as 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

interface PropTypes {
  onAddPet: (p: Pet) => void;
  classes: { [key: string]: string };
}

interface StateTypes {
  open: boolean;
  name: Pet['name'];
  type: Pet['type'];
}

type ChangeEvent = React.ChangeEvent<
  | HTMLSelectElement
  | HTMLInputElement
  | HTMLTextAreaElement
>

type ChangeFn = (e: ChangeEvent) => void

class PetCard extends React.Component<PropTypes> {
  state: StateTypes = {
    open: false,
    name: '',
    type: 'dog',
  };

  handleToggleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleChange = withCache<keyof Pick<StateTypes, 'name'|'type'>, ChangeFn>(
    key => (e: ChangeEvent) => {
      const value = e.target.value;
      this.setState({ [key]: value });
    }
  )

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, type } = this.state;
    const pet = await createPet({ name, type });

    this.props.onAddPet(pet);
    this.handleToggleModal();
  }

  render() {
    const { classes } = this.props;
    const { name, open, type } = this.state;
    return <div className="add-pet">
      <Button variant="contained" onClick={this.handleToggleModal}>
          <p className={classes.p}>
            ADD NEW PET
          </p>
          <AddCircleIcon />
      </Button>
      <div className="modal">
        <Modal
          open={open}
          onClose={this.handleToggleModal}
          className={classes.modalContainer}
        >
          <div className={classes.modal}>
            <Typography variant="h5" color="inherit" noWrap>
              Add New Pet
            </Typography>
            <form onSubmit={this.handleSubmit} className={classes.p}>
              <FormControl fullWidth className={classes.p}>
                <InputLabel htmlFor="name" className={classes.fontSize} >
                  Name
                </InputLabel>
                <Input
                  className={classes.fontSize}
                  autoComplete="name"
                  autoFocus
                  id="name"
                  name="name"
                  onChange={this.handleChange('name')}
                  value={name}
                />
              </FormControl>
              <FormControl fullWidth className={classes.p}>
                <NativeSelect
                  className={classes.fontSize}
                  value={type}
                  onChange={this.handleChange('type')}
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </NativeSelect>
              </FormControl>
              <div className="align-center">
                <Button
                  className={classes.button}
                  disabled={!name}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Pet
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  }
}

export default withStyles(styles)(PetCard);
