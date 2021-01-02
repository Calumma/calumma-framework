import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

const handleMultiLevelPropertyChange = (propertyLevels, values) => {
    let obj_test = undefined;
    let aux_obj = values;
    for (let x = 0; x < propertyLevels.length; x++) {
        if (aux_obj[propertyLevels[x]])
            aux_obj = aux_obj[propertyLevels[x]]
        else {
            aux_obj = undefined;
            break;
        }
    }
    obj_test = aux_obj

    if(obj_test == undefined)
        return null

    return obj_test;
};

const getValuesParemeter = (name, values) => {
    const propertyLevels = name.split(".");
    if (propertyLevels.length == 1)
        return values[name]
    return handleMultiLevelPropertyChange(propertyLevels, values);
}

const CalummaDateField = (props) => {

    let otherProperties = JSON.parse(JSON.stringify(props));

    delete otherProperties["id"]
    delete otherProperties["value"]
    delete otherProperties["error"]
    delete otherProperties["onChange"]
    delete otherProperties["KeyboardButtonProps"]

    return (
        <KeyboardDatePicker
            id={"calumma-time-" + Math.random() * 10000}
            value={props.value ? props.value: getValuesParemeter(props.name, props.values)}
            error={props.errors[props.name] ? props.errors[props.name].hasError : false}
            helperText={props.errors[props.name] ? props.errors[props.name].message : otherProperties.helperText}
            onChange={(date) => props.onChange(undefined, props.name, date)}
            showTodayButton
            todayLabel="Hoje"
            cancelLabel="Cancelar"
            KeyboardButtonProps={{
                'aria-label': 'Modificar data',
            }}
            {...otherProperties}
        />
    );
};

CalummaDateField.propTypes = {

    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    
    values: PropTypes.object,
    errors: PropTypes.object,
    
    helperText: PropTypes.string
}

CalummaDateField.displayName = 'CalummaDateField';
export default CalummaDateField;
