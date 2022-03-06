import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';

import { getAll, getLoading, fetchAll } from '../../../redux/postsRedux.js';
import { isLogged } from '../../../redux/userRedux.js';

import styles from './Homepage.module.scss';

import { Loading } from '../../features/Loading/Loading.js';

const Component = ({ className, allPosts, loadingStatus, isUserLogged, loadPosts }) => {

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if(loadingStatus.active){
    return (
      <Loading/>
    );
  } else if(loadingStatus.error) {
    return (
      <Loading errorMessage={loadingStatus.error}/>
    );
  } else {
    return (
      <Paper className={clsx(className, styles.root)}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography gutterBottom variant='h4'>
              Your Bulletin Board
            </Typography>
            <Typography gutterBottom variant='h5'>
              Latest classifieds:
            </Typography>
          </Grid>
          {isUserLogged && <Grid item>
            <Button
              component={Link}
              to='/post/add'
              variant="contained"
              color="primary"
              size="large"
            >
              Add New Classified
            </Button>
          </Grid>}
        </Grid>
        <List>
          {allPosts.sort((a,b) => (
            b.releaseTime - a.releaseTime
          )).map(post => (
            <ListItem
              key={post.id}
              button={true}
              component={Link}
              to={'/post/' + post.id}
            >
              <ListItemIcon>
                <ForwardOutlinedIcon
                  fontSize="large"
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText
                primary={post.title}
                secondary={post.content}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  allPosts: PropTypes.array,
  loadingStatus: PropTypes.object,
  isUserLogged: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  loadPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  allPosts: getAll(state),
  loadingStatus: getLoading(state),
  isUserLogged: isLogged(state),
});

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(fetchAll()),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as Homepage,
  Component as HomepageComponent,
};
