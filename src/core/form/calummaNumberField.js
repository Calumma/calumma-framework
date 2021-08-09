import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';

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
            value={props.values[props.name]}
            onChange={props.onChange}
            error={props.errors[props.name] ? props.errors[props.name].hasError : false}
            helperText={props.errors[props.name] ? props.errors[props.name].message : otherProperties.helperText}
            InputProps={{ inputComponent: NumberFormatCustom }}
            {...props}
        />
    );
}

CalummaNumberField.displayName = 'CalummaNumberField';
export default CalummaNumberField;
