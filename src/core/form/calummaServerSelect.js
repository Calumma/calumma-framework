import React, { useState, useEffect } from 'react'
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import useCrud from '../hooks/useCrud'
import PropTypes from 'prop-types';


const CalummaServerSelect = (props) => {
  const [options, setOptions] = useState([]);
  const { read } = useCrud(props.url);

  useEffect(() => {
    read("/query?projection=id," + props.field, undefined)
      .then((data) => { setOptions(data.content); });
  }, [])

  return (
    <FormControl fullWidth error={props.error}>
      <InputLabel htmlFor={"select-" + props.name}>{props.placeholder}</InputLabel>
      <Select
        disabled={props.disabled}
        inputProps={{
          name: props.name,
          id: "select-" + props.name,
        }}
        error={props.errors[props.name] ? props.errors[props.name].hasError : false}
        helperText={props.errors[props.name] ? props.errors[props.name].message : props.helperText}
        value={props.values[props.name]}
        onChange={props.onChange}
        fullWidth
      >
        {
          options.map(x => <MenuItem key={x.id} value={x.id}> {x[props.field]} </MenuItem>)
        }
      </Select>
      <FormHelperText>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  )
}

CalummaServerSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  
  disabled: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object
}

CalummaServerSelect.displayName = 'CalummaServerSelect';
export default CalummaServerSelect;
