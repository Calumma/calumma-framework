import React from 'react'
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';

const CalummaEnumSelect = (props) => {
 
  return (
    <FormControl fullWidth required={props.required ? props.required : false}  error={props.errors[props.name] ? props.errors[props.name].hasError : false}>
      <InputLabel htmlFor={"select-" + props.name}>{props.label}</InputLabel>
      <Select
        disabled={props.disabled}
        inputProps={{
          name: props.name,
          id: "select-" + props.name,
        }}
        value={props.values[props.name]}
        error={props.errors[props.name] ? props.errors[props.name].hasError : false}
        onChange={props.onChange}
        fullWidth
      >
        {
          props.options.map(x => <MenuItem key={x.key} value={x.key}> {x.value} </MenuItem>)
        }
      </Select>
      <FormHelperText>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  )
}

CalummaEnumSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,  
  disabled: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object
}

CalummaEnumSelect.displayName = 'CalummaEnumSelect';
export default  CalummaEnumSelect;