import React from 'react'
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const handleMultiLevelPropertyChange = (propertyLevels, values) => {
    let obj_test = undefined;
    let aux_obj = values;

    if (aux_obj != undefined) {
        for (let x = 0; x < propertyLevels.length; x++) {
            if (aux_obj[propertyLevels[x]])
                aux_obj = aux_obj[propertyLevels[x]]
            else {
                aux_obj = undefined;
                break;
            }
        }
        obj_test = aux_obj

        if (obj_test == undefined)
            return null
    }

    return obj_test;
};

const getValuesParemeter = (name, values) => {
    const propertyLevels = name.split(".");
    if (propertyLevels.length == 1)
        return values[name]
    return handleMultiLevelPropertyChange(propertyLevels, values);
}

const getError = (props) => {
    let finalError = { hasError: false, helperText: "" }

    if (props.error) {
        finalError.hasError = props.error;
        if (props.errorMessage)
            finalError.message = props.errorMessage;
    } else if (props.errors && props.errors[props.name]) {
        finalError = props.errors[props.name];
    }

    return finalError;
}

const CalummaTextField = (props) => {

    return (
        <TextField
            value={props.values ? getValuesParemeter(props.name, props.values) : props.value}
            error={getError(props).hasError}
            helperText={getError(props).message}
            onChange={props.onChange}
            inputProps={{
                autoComplete: "new-password"
            }}
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
export default CalummaTextField;
