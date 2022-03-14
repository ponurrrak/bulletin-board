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
import IconButton from '@material-ui/core/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

import { fetchUser, getUser } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, user, fetchUser }) => {

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
                  {!user.userId &&
                  <span>
                    <Button className={styles.iconLink} component='a' href='/auth/google'>
                      Sign in with
                      <IconButton className={clsx(styles.icon, styles.iconGoogle)}>

                        <FontAwesomeIcon icon={ faGoogle }/>
                      </IconButton>
                    </Button>
                    <Button className={styles.iconLink} component='a' href='/auth/facebook'>
                      Or sign in with
                      <IconButton className={clsx(styles.icon, styles.iconFacebook)}>
                        <FontAwesomeIcon icon={ faFacebookF }/>
                      </IconButton>
                    </Button>
                  </span>}
                  {user.userId &&
                  <Button className={styles.link} component={Link} to={{
                    pathname: '/',
                    state: {
                      userId: user.userId,
                    },
                  }}>
                    My posts
                  </Button>}
                  {user.userId &&
                  <Button className={styles.link} component='a' href='/auth/logout'>
                    Sign out
                  </Button>}
                </Grid>
                <Grid item className={styles.user}>
                  <div className={styles.userInfo}>
                    <p>
                      {'You are ' + (user.userId ? ('logged as ' + (user.admin ? 'Admin' : user.displayName)) : 'not logged')}
                    </p>
                  </div>
                  {user.photo && <div className={styles.userPhoto}>
                    <img src={user.photo} alt="" />
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
  user: PropTypes.object,
  fetchUser: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as Header,
  Component as HeaderComponent,
};
