import React from 'react';

import { Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => ({
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
  children: JSX.Element;
  open: boolean;
  onClose: () => void;
  classes: any;
}

const NewModal = ({ children, open, onClose, classes }: PropTypes) =>
  <Modal open={open} onClose={onClose} className={classes.modalContainer}>
    <div className={classes.modal}>
      {children}
    </div>
  </Modal>;

export default withStyles(styles)(NewModal);
