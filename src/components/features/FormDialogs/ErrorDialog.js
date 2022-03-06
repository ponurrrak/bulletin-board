import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';

import settings from '../../../settings.js';

const Component = ({ errorArray, clearErrorArray }) => {

  const handleErrorDialogClose = () => (
    clearErrorArray([])
  );

  return (
    <Dialog
      open={Boolean(errorArray.length)}
      onClose={handleErrorDialogClose}
    >
      <DialogTitle>
        There are some errors in your post:
      </DialogTitle>
      <DialogContent>
        <List>
          {errorArray.map(error => (
            <ListItem
              key={error}
            >
              <ListItemIcon>
                <ErrorIcon
                  color="secondary"
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText
                primary={settings.messages[error]}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleErrorDialogClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>

  );
};

Component.propTypes = {
  errorArray: PropTypes.array,
  clearErrorArray: PropTypes.func,
};

export {
  Component as ErrorDialog,
};
