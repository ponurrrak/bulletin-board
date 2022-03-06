import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './NotFound.module.scss';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <Paper className={styles.wrapper}>
      <Typography gutterBottom variant='h2'>
        404
      </Typography>
      <Typography gutterBottom variant='h3'>
        Not Found
      </Typography>
      <Button
        component={Link}
        to='/'
        variant="contained"
        color="primary"
        size="large"
      >
        Back to Home
      </Button>
    </Paper>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};
