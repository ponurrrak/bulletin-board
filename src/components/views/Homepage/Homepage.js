import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { createSpanMarkup } from '../../common/createMarkup.js';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';

import { getAll, getLoading, fetchAll, fetchMyPosts } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './Homepage.module.scss';

import { Loading } from '../../features/Loading/Loading.js';

const Component = ({ className, allPosts, loadingStatus, user, loadAllPosts, loadMyPosts, location: {state} }) => {

  useEffect(() => {
    if(state && state.userId){
      loadMyPosts(state.userId);
    } else {
      loadAllPosts();
    }
  }, [loadAllPosts, loadMyPosts, state ]);

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
              {(state && state.userId ? 'Your own l' : 'L') + 'atest classifieds:'}
            </Typography>
          </Grid>
          {user.userId && <Grid item>
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
              key={post._id}
              button={true}
              component={Link}
              to={'/post/' + post._id}
            >
              <ListItemIcon>
                <ForwardOutlinedIcon
                  fontSize="large"
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText
                primary={createSpanMarkup(post.title)}
                secondary={createSpanMarkup(post.content)}
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
  user: PropTypes.object,
  loadAllPosts: PropTypes.func,
  loadMyPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  allPosts: getAll(state),
  loadingStatus: getLoading(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  loadAllPosts: () => dispatch(fetchAll()),
  loadMyPosts: userId => dispatch(fetchMyPosts(userId)),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as Homepage,
  Component as HomepageComponent,
};
