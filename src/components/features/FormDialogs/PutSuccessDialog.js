import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const Component = ({ isNewPostVersion, resetPostVersion, updatePostCopy }) => {

  const handlePutSuccessDialogClose = () => {
    resetPostVersion(false);
    updatePostCopy(false);
  };

  return (
    <Dialog
      open={Boolean(isNewPostVersion)}
      onClose={handlePutSuccessDialogClose}
    >
      <DialogTitle>
        Changes have been saved
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'Post version number is : ' + isNewPostVersion}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePutSuccessDialogClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Component.propTypes = {
  isNewPostVersion: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  resetPostVersion: PropTypes.func,
  updatePostCopy: PropTypes.func,
};

export {
  Component as PutSuccessDialog,
};
