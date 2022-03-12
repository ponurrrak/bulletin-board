import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './Loading.module.scss';
import { NotFound } from '../../views/NotFound/NotFound';

const Component = ({className, errorMessage = false}) => {
  if(typeof errorMessage === 'string' && errorMessage.toLowerCase() === 'not found') {
    return (
      <NotFound />
    );
  } else {
    return (
      <Paper className={clsx(className, styles.root)}>
        <Typography gutterBottom variant='h4'>
          {errorMessage ?
            <span>
              Error! Details:
              <pre className={styles.pre}>
                {(typeof errorMessage === 'string') ? errorMessage : 'Unknown error'}
              </pre>
            </span>
            :
            'Loading...'}
        </Typography>
      </Paper>
    );
  }
};



Component.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export {
  Component as Loading,
  Component as LoadingComponent,
};
