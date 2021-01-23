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

const CalummaTextField = (props) => {

    return (
        <TextField
            value={getValuesParemeter(props.name, props.values)}
            error={props.errors[props.name] ? props.errors[props.name].hasError : false}
            helperText={props.errors[props.name] ? props.errors[props.name].message : props.helperText}
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
