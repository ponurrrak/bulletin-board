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
        <div className={styles.wrapper}>
          {
            errorMessage ?
              <div>
                <Typography gutterBottom variant='h1'>
                  Error!
                </Typography>
                <Typography gutterBottom variant='h2'>
                  Details:
                </Typography>
                <Typography gutterBottom variant='h3'>
                  <pre className={styles.pre}>
                    {(typeof errorMessage === 'string') ? errorMessage : 'Unknown error'}
                  </pre>
                </Typography>
              </div>
              :
              <Typography gutterBottom variant='h1'>
                Loading...
              </Typography>
          }
        </div>
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
