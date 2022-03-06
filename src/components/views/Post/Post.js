import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getCurrent, getLoading, fetchCurrent } from '../../../redux/currentPostRedux.js';
import { isLogged, isAdmin } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';

import { Loading } from '../../features/Loading/Loading.js';

const Component = ({className, currentPost, loadingStatus, loadPost, userId, isAdmin, match: {params: {id}}}) => {

  useEffect(() => {
    loadPost(id);
  }, [loadPost, id]);

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
      <div className={clsx(className, styles.root)}>
        <Paper className={styles.paper}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography gutterBottom variant='h4'>
                {'Post no ' + id + ' details:'}
              </Typography>
              <Typography gutterBottom variant='h5'>
                {currentPost.title}
              </Typography>
            </Grid>
            {(userId === currentPost.authorId || isAdmin) && <Grid item>
              <Button
                component={Link}
                to={'/post/' + id + '/edit'}
                variant="contained"
                color="primary"
                size="large"
              >
                Edit post
              </Button>
            </Grid>}
          </Grid>
        </Paper>
        <Paper className={styles.paper}>
          <Grid
            container
            direction="row"
            spacing={6}
          >
            <Grid item xs={12} md={6}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      Released:
                    </TableCell>
                    <TableCell align="left">
                      {new Date(Number(currentPost.releaseTime)).toDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      Latest update:
                    </TableCell>
                    <TableCell align="left">
                      {new Date(Number(currentPost.updateTime)).toDateString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      Post status:
                    </TableCell>
                    <TableCell align="left">
                      {currentPost.status}
                    </TableCell>
                  </TableRow>
                  {(typeof currentPost.price === 'number') ?
                    <TableRow>
                      <TableCell align="right">
                        Price:
                      </TableCell>
                      <TableCell align="left">
                        {currentPost.price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </TableCell>
                    </TableRow>
                    : null
                  }
                  <TableRow>
                    <TableCell align="right">
                      Email contact:
                    </TableCell>
                    <TableCell align="left">
                      {currentPost.email}
                    </TableCell>
                  </TableRow>
                  {currentPost.phone ?
                    <TableRow>
                      <TableCell align="right">
                        Phone contact:
                      </TableCell>
                      <TableCell align="left">
                        {currentPost.phone}
                      </TableCell>
                    </TableRow>
                    :
                    null
                  }
                  {currentPost.location ?
                    <TableRow>
                      <TableCell align="right">
                        Location:
                      </TableCell>
                      <TableCell align="left">
                        {currentPost.location}
                      </TableCell>
                    </TableRow>
                    :
                    null
                  }
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12} md={6}>
              {currentPost.photo ?
                <img
                  src={'/' + currentPost.photo}
                  alt={currentPost.photo}
                  className={styles.image}
                />
                :
                <div>
                  <Typography gutterBottom variant='h6'>
                    Post content:
                  </Typography>
                  <p>
                    {currentPost.content}
                  </p>
                </div>
              }
            </Grid>
          </Grid>
        </Paper>
        {currentPost.photo && <Paper
          className={styles.paper}
        >
          <Typography gutterBottom variant='h6'>
            Post content:
          </Typography>
          <p>
            {currentPost.content}
          </p>
        </Paper>}
      </div>

    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  currentPost: PropTypes.object,
  loadingStatus: PropTypes.object,
  loadPost: PropTypes.func,
  userId: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  isAdmin: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  currentPost: getCurrent(state),
  loadingStatus: getLoading(state),
  userId: isLogged(state),
  isAdmin: isAdmin(state),
});

const mapDispatchToProps = dispatch => ({
  loadPost: postId => dispatch(fetchCurrent(postId)),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as Post,
  Component as PostComponent,
};
