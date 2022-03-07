import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';

import { getCurrent, getLoading, fetchSuccess, fetchCurrent, putChanged } from '../../../redux/currentPostRedux.js';
import { isAdmin, isLogged } from '../../../redux/userRedux.js';

import styles from './PostEdit.module.scss';

import { NotFound } from '../NotFound/NotFound.js';
import { Loading } from '../../features/Loading/Loading.js';
import { ErrorDialog } from '../../features/FormDialogs/ErrorDialog';
import { PutSuccessDialog } from '../../features/FormDialogs/PutSuccessDialog';
import { PostBody } from '../../features/PostBody/PostBody';

const Component = ({
  className,
  loadPostWithId,
  newPost,
  isLogged,
  loadingStatus,
  savePostChange,
  isAdmin,
  putChangedPost,
  match,
}) => {

  const postIdFromUrl = match.params.id;

  const [isFormError, setFormError] = useState([]);
  const [postVersion, setPostVersion] = useState(false);
  const [postCopy, updatePostCopy] = useState(false);

  useEffect(() => {
    loadPostWithId(postIdFromUrl);
  }, [loadPostWithId, postIdFromUrl]);

  useEffect(() => {
    if(!postVersion && typeof newPost.version === 'number'){
      setPostVersion({
        oldVersionNumber: newPost.version,
      });
    } else if(postVersion.oldVersionNumber < newPost.version) {
      setPostVersion({
        newVersionNumber: newPost.version,
      });
    }
  }, [postVersion, newPost.version]);

  useEffect(() => {
    if(!postCopy && newPost._id){
      updatePostCopy({
        ...newPost,
      });
    }
  }, [newPost, postCopy]);

  const isFileValid = () => (
    !newPost.photo || typeof newPost.photo === 'string' || newPost.photo.type.startsWith('image/')
  );

  const isPostNotChanged = () => {
    for(const field in postCopy){
      if(postCopy[field] !== newPost[field]){
        return false;
      }
    }
    return true;
  };

  const completePost = () => {
    const date = Date.now();
    savePostChange({
      updateTime: date,
      authorId: isLogged,
      price: newPost.price === '' ? '' : Number(newPost.price),
    });
  };

  if(!(isAdmin || (newPost.authorId === isLogged))){
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
          <PutSuccessDialog
            isNewPostVersion={postVersion.newVersionNumber}
            resetPostVersion={setPostVersion}
            updatePostCopy={updatePostCopy}
          />
          <PostBody
            {...{
              newPost,
              savePostChange,
              isFileValid,
              isPostNotChanged,
              completePost,
              setFormError,
            }}
            sendToServer={putChangedPost}
            headerText={'Edit post no ' + postIdFromUrl}
          />
        </Paper>
      </form>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  newPost: PropTypes.object,
  loadingStatus: PropTypes.object,
  loadPostWithId: PropTypes.func,
  savePostChange: PropTypes.func,
  putChangedPost: PropTypes.func,
  isAdmin: PropTypes.bool,
  isLogged: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  newPost: getCurrent(state),
  loadingStatus: getLoading(state),
  isLogged: isLogged(state),
  isAdmin: isAdmin(state),
});

const mapDispatchToProps = dispatch => ({
  savePostChange: changes => dispatch(fetchSuccess(changes)),
  loadPostWithId: postId => dispatch(fetchCurrent(postId)),
  putChangedPost: () => dispatch(putChanged()),
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ComponentContainer as PostEdit,
  Component as PostEditComponent,
};
