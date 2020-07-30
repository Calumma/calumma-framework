import React from 'react'
import { KeyboardTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';


const CalummaTimeField = (props) => {

    let otherProperties = JSON.parse(JSON.stringify(props));

    delete otherProperties["id"];
    delete otherProperties["value"];
    delete otherProperties["error"];
    delete otherProperties["onChange"];
    delete otherProperties["KeyboardButtonProps"];


    return (
        <KeyboardTimePicker
            id={"calumma-time-" + Math.random() * 10000}
            ampm={false}
            value={props.values[props.name]}
            error={props.errors[props.name] ? props.errors[props.name].hasError : false}
            onChange={(date) => props.onChange(undefined, props.name, date)}
            KeyboardButtonProps={{
                'aria-label': 'Modificar tempo',
            }}
            {...otherProperties}
        />
    );
};

CalummaTimeField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    
    values: PropTypes.object,
    errors: PropTypes.object,

    helperText: PropTypes.string
}

CalummaTimeField.displayName = 'CalummaTimeField';
export default  CalummaTimeField;
