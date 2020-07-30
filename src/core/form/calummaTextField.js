import React from 'react'
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const CalummaTextField = (props) => {

    return (
        <TextField
            id={"calumma-" + Math.random() * 10000}
            value={props.values[props.name]}
            error={props.errors[props.name] ? props.errors[props.name].hasError : false}
            helperText={props.errors[props.name] ? props.errors[props.name].message : props.helperText}
            onChange={props.onChange}
            {...props}
        />
    );
};

CalummaTextField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    
    values: PropTypes.object,
    errors: PropTypes.object,

    helperText: PropTypes.string
}

CalummaTextField.displayName = 'CalummaTextField';
export default  CalummaTextField;
