import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const Component = ({ postId, clearForm }) => {

  const handlePostSuccessDialogClose = () => (
    clearForm()
  );

  return (
    <Dialog
      open={Boolean(postId)}
      onClose={handlePostSuccessDialogClose}
    >
      <DialogTitle>
        Your post has been sent successfully
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'It has given ID number: ' + postId}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePostSuccessDialogClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Component.propTypes = {
  clearForm: PropTypes.func,
  postId: PropTypes.string,
};

export {
  Component as PostSuccessDialog,
};
