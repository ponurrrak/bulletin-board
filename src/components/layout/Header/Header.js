import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { isLogged, isAdmin, fetchUser, getName, getPhoto } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, isLogged, isAdmin, fetchUser, userDisplayName, userPhoto }) => {

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
                  {!isLogged && <Button className={styles.link} component='a' href='/auth/google'>
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
                  {isLogged && <Button className={styles.link} component='a' href='/auth/logout'>
                    Sign out
                    <FontAwesomeIcon className={styles.icon} icon={ faGoogle }/>
                  </Button>}
                </Grid>
                <Grid item className={styles.user}>
                  <div className={styles.userInfo}>
                    <p>
                      {'You are ' + (isLogged ? ('logged as ' + (isAdmin ? 'Admin' : userDisplayName)) : 'not logged')}
                    </p>
                  </div>
                  {userPhoto && <div className={styles.userPhoto}>
                    <img src={userPhoto} alt="" />
                  </div>}
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
  fetchUser: PropTypes.func,
  userDisplayName: PropTypes.string,
  userPhoto: PropTypes.string,
};

const mapStateToProps = state => ({
  isLogged: isLogged(state),
  isAdmin: isAdmin(state),
  userDisplayName: getName(state),
  userPhoto: getPhoto(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as Header,
  Component as HeaderComponent,
};
