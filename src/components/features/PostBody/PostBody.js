import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import DOMPurify from 'dompurify';

import styles from './PostBody.module.scss';

import { FormField } from '../FormField/FormField';
import settings from '../../../settings.js';
import { createSpanMarkup } from '../../common/createMarkup';

const Component = ({
  newPost,
  savePostChange,
  isFileValid,
  isPostNotChanged,
  sendToServer,
  setFormError,
  headerText,
}) => {

  const handleInputChange = inputName => {
    return e => {
      savePostChange({[inputName]: e.target.value});
    };
  };

  const handlePriceChange = e => {
    const pattern = /(^$)|(^0\.?$)|(^0\.[0-9]{1,2}$)|(^[1-9][0-9]*\.?$)|(^[1-9][0-9]*\.[0-9]{1,2}$)/;
    const val = e.target.value.replace(',', '.');
    if(pattern.test(val)){
      savePostChange({price: val});
    }
  };

  const handleStopEditPrice = e => (
    savePostChange({price: e.target.value === '' ? '' : Number(e.target.value)})
  );

  const handleUploadFile = e => {
    if(!newPost.photoOriginal || !newPost.photoOriginal.name){
      savePostChange({photoOriginal: e.target.files[0]});
    }
  };

  const handleRemoveFile = e => {
    if(newPost.photoOriginal){
      e.preventDefault();
      savePostChange({photoOriginal: ''});
    }
  };

  const isFormFieldNotValid = (field, pattern) => (
    !pattern.test(newPost[field]) && field
  );

  const validateForm = () => {
    const errors = [];
    for(const field in settings.patterns){
      const error = isFormFieldNotValid(field, settings.patterns[field]);
      if(error){
        errors.push(error);
      }
    }
    if(!isFileValid()){
      errors.push('photo');
    }
    if(isPostNotChanged && isPostNotChanged()){
      errors.push('noChanges');
    }
    return errors;
  };

  const sanitizePost = () => {
    for(const field in settings.patterns){
      savePostChange({[field]: DOMPurify.sanitize(newPost[field])});
    }
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if(errors.length){
      setFormError(errors);
    } else {
      sanitizePost();
      sendToServer();
    }
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={styles.header}
      >
        <Grid item>
          <Typography gutterBottom variant='h4'>
            {headerText}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl variant="filled" className={styles.select}>
            <InputLabel focused={false}>Post status</InputLabel>
            <Select
              value={newPost.status}
              onChange={handleInputChange('status')}
            >
              <MenuItem value='draft'>Draft</MenuItem>
              <MenuItem value='published'>Published</MenuItem>
              <MenuItem value='closed'>Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={3}
        alignItems="center"
      >
        <FormField
          label="Post title"
          placeholder='Min. 10 chars'
          value={newPost.title}
          handleChange={handleInputChange('title')}
        />
        <FormField
          label="Contact email"
          placeholder='Required'
          value={newPost.email}
          handleChange={handleInputChange('email')}
        />
        <FormField
          label="Price"
          placeholder='0.00 or empty'
          value={newPost.price}
          handleChange={handlePriceChange}
          handleBlur={handleStopEditPrice}
        />
        <FormField
          label="Location"
          placeholder='Optional'
          value={newPost.location}
          handleChange={handleInputChange('location')}
        />
        <FormField
          label="Phone"
          placeholder='Digits only or empty'
          value={newPost.phone}
          handleChange={handleInputChange('phone')}
        />
        <Grid
          item
          xs={12} md={6} lg={4}
          className={styles.uploadWrapper}
        >
          <input
            accept="image/*"
            className={styles.uploadInput}
            id="uploadInput"
            type="file"
            onClick={handleRemoveFile}
            onChange={handleUploadFile}
          />
          <label htmlFor="uploadInput">
            <Button
              variant="contained"
              color="default"
              component="span"
              startIcon={<PhotoCamera/>}
              size="large"
            >
              {(newPost.photoOriginal && 'Remove') || 'Upload'}
            </Button>
          </label>
          <Typography className={styles.uploadedFileInfo}>
            {newPost.photoOriginal ?
              <span>
                You&apos;ve selected&nbsp;
                {createSpanMarkup(newPost.photoOriginal.name || newPost.photoOriginal)}
              </span>
              :
              <span>
                No file selected
                <br/>
                (but you don&apos;t have to)
              </span>
            }
          </Typography>
        </Grid>
        <FormField
          label="Post content"
          multiline={true}
          placeholder='Min. 20 chars'
          value={newPost.content}
          handleChange={handleInputChange('content')}
        />
        <Grid item xs={3} className={styles.submitWrapper}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Component.propTypes = {
  newPost: PropTypes.object,
  savePostChange: PropTypes.func,
  isFileValid: PropTypes.func,
  isPostNotChanged: PropTypes.func,
  sendToServer: PropTypes.func,
  setFormError: PropTypes.func,
  headerText: PropTypes.string,
};

export {
  Component as PostBody,
  Component as PostBodyComponent,
};
