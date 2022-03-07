import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { isLogged, isAdmin, fetchSuccess } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, isLogged, isAdmin, switchUser }) => {
  const handleChange = e => {
    switch (e.target.value) {
      case 'admin': {
        switchUser({
          logged: true,
          admin: true,
        });
        break;
      }
      case 'logged': {
        switchUser({
          logged: '123456789',
          admin: false,
        });
        break;
      }
      default:
        switchUser({
          logged: false,
          admin: false,
        });
    }
  };
  return (
    <div className={clsx(className, styles.root)}>
      <AppBar>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <nav className={styles.nav}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Button className={styles.link} component={Link} to='/'>Home</Button>
                  {!isLogged && <Button className={styles.link} component='a' href='https://google.com'>
                    Sign in with
                    <FontAwesomeIcon className={styles.icon} icon={ faGoogle }/>
                  </Button>}
                  {isLogged && <Button className={styles.link} component={Link} to={{
                    pathname: '/',
                    state: {
                      userId: isLogged,
                    },
                  }}>
                    My posts
                  </Button>}
                  {isLogged && <Button className={styles.link} component='a' href='https://google.com'>
                    Sign out
                    <FontAwesomeIcon className={styles.icon} icon={ faGoogle }/>
                  </Button>}
                </Grid>
                <Grid item>
                  <FormControl className={styles.select}>
                    <InputLabel focused={false}>Switch user</InputLabel>
                    <Select
                      value={isLogged ? (isAdmin ? 'admin' : 'logged') : 'not logged'}
                      onChange={handleChange}
                    >
                      <MenuItem value='not logged'>Not logged</MenuItem>
                      <MenuItem value='logged'>Logged</MenuItem>
                      <MenuItem value='admin'>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </nav>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  isAdmin: PropTypes.bool,
  switchUser: PropTypes.func,
};

const mapStateToProps = state => ({
  isLogged: isLogged(state),
  isAdmin: isAdmin(state),
});

const mapDispatchToProps = dispatch => ({
  switchUser: user => dispatch(fetchSuccess(user)),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as Header,
  Component as HeaderComponent,
};
