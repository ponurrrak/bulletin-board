import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import { getCurrent, getLoading, fetchSuccess, clearData, postNew } from '../../../redux/currentPostRedux.js';
import { getUser } from '../../../redux/userRedux.js';

import styles from './PostAdd.module.scss';

import { NotFound } from '../NotFound/NotFound.js';
import { Loading } from '../../features/Loading/Loading.js';
import { ErrorDialog } from '../../features/FormDialogs/ErrorDialog';
import { PostSuccessDialog } from '../../features/FormDialogs/PostSuccessDialog';
import { PostBody } from '../../features/PostBody/PostBody';

const Component = ({
  className,
  loadInitialState,
  newPost,
  user,
  loadingStatus,
  savePostChange,
  postNewPost,
}) => {

  const [isFormError, setFormError] = useState([]);

  useEffect(() => {
    if(user.email) {
      loadInitialState({email: user.email});
    } else {
      loadInitialState();
    }
  }, [loadInitialState, user.email]);

  const isFileValid = () => (
    !newPost.photoOriginal || newPost.photoOriginal.type.startsWith('image/')
  );

  if(!user.userId){
    return (
      <NotFound/>
    );
  } else if(loadingStatus.active){
    return (
      <Loading/>
    );
  } else if(loadingStatus.error) {
    return (
      <Loading errorMessage={loadingStatus.error}/>
    );
  } else {
    return (
      <form className={clsx(className, styles.root)}>
        <Paper className={styles.paper}>
          <ErrorDialog
            errorArray={isFormError}
            clearErrorArray={setFormError}
          />
          <PostSuccessDialog
            postId={newPost._id}
            clearForm={loadInitialState}
          />
          <PostBody
            {...{
              newPost,
              savePostChange,
              isFileValid,
              setFormError,
            }}
            sendToServer={postNewPost}
            headerText="Add new post"
          />
        </Paper>
      </form>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  newPost: PropTypes.object,
  user: PropTypes.object,
  loadingStatus: PropTypes.object,
  loadInitialState: PropTypes.func,
  savePostChange: PropTypes.func,
  postNewPost: PropTypes.func,
};

const mapStateToProps = state => ({
  newPost: getCurrent(state),
  loadingStatus: getLoading(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  loadInitialState: (defaults={}) => dispatch(clearData(defaults)),
  savePostChange: changes => dispatch(fetchSuccess(changes)),
  postNewPost: () => dispatch(postNew()),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as PostAdd,
  Component as PostAddComponent,
};
