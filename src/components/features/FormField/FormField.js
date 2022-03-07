import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const Component = ({ label, placeholder, value, handleChange, multiline = false }) => (
  <Grid
    item
    xs={multiline ? 9 : 12}
    md={!multiline && 6}
  >
    <TextField
      {...{
        label,
        placeholder,
        multiline,
        value,
      }}
      variant="outlined"
      fullWidth
      rows={Number(multiline && 8)}
      onChange={handleChange}
    />
  </Grid>
);

Component.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  handleChange: PropTypes.func,
  multiline: PropTypes.bool,
};

export {
  Component as FormField,
  Component as FormFieldComponent,
};
