import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';


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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            value={props.value}
            onValueChange={(values) => {
                if (props.value != values.value) {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }
            }}
            thousandSeparator={"."}
            decimalSeparator={","}
            allowEmptyFormatting={true}
            allowNegative={false}
            isNumericString={![".", ","].includes(String(props.value).substr(0, 1))}
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const CalummaNumberField = (props) => {

    let otherProperties = JSON.parse(JSON.stringify(props));

    delete otherProperties["id"]
    delete otherProperties["value"]
    delete otherProperties["error"]
    delete otherProperties["onChange"]
    delete otherProperties["KeyboardButtonProps"]

    return (
        <TextField
            id={"calumma-" + Math.random() * 10000}
            value={props.values ? getValuesParemeter(props.name, props.values) : props.value}
            onChange={props.onChange}
            error={getError(props).hasError}
            helperText={getError(props).message}
            InputProps={{ inputComponent: NumberFormatCustom }}
            {...props}
        />
    );
}

CalummaNumberField.displayName = 'CalummaNumberField';
export default CalummaNumberField;
