/* eslint-disable react-hooks/exhaustive-deps */
import 'isomorphic-fetch';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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

    return obj_test;
};

const getValuesParemeter = (name, values) => {
    const propertyLevels = name.split(".");
    if (propertyLevels.length == 1)
        return values[name]
    return handleMultiLevelPropertyChange(propertyLevels, values);
}

const getValue = (props) => {
    if (props.value)
        return props.value;
    else if (props.values) {
        let property_potential_value = getValuesParemeter(props.name, props.values)
        return property_potential_value;
    }
    return undefined;
}

const getError = (props) => {
    let finalError = { hasError: false, helperText: "" }

    if (props.error) {
        finalError.hasError = props.error;
        if (props.errorMessage)
            finalError.message = props.errorMessage;
    } else if (props.errors[props.name]) {
        finalError = props.errors[props.name];
    }

    return finalError;
}

const CalummaAutoComplete = (props) => {

    const [open, setOpen] = useState(false);
    const [actualSearch, setActualSearch] = useState("");
    const [previousValue, setPreviousValue] = useState("");

    const useCheckbox = (option, { selected }) => (
        <React.Fragment>
            <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
            />
            {option[props.field]}
        </React.Fragment>
    )

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const loading = open && props.options.length === 0;

    React.useEffect(() => {
        if (!open) {
            props.setOptions([]);
        } else if (props.dataLoader) {
            props.dataLoader();
        }
    }, [open]);

    React.useEffect(() => {
        let actualValue = getValue(props);
        if ((previousValue != "" && previousValue != null && previousValue != undefined) &&
            (actualValue == "" || !actualValue)) {
            setActualSearch("");
            setPreviousValue("");
        }

        if (!(actualValue == "" || !actualValue))
            setPreviousValue(actualValue);

    }, [props.value, props.values]);

    let currentValue = getValue(props);
    let valueInput = !currentValue ? "" : currentValue["id"]
    let key = "asynchronous-" + props.name + valueInput;

    return (
        <Autocomplete
            key={key}
            autoComplete={props.autoComplete}
            autoSelect={props.autoSelect}
            autoHighlight={true}
            onChange={props.onChange}
            name={props.name}
            value={currentValue}
            multiple={props.multiple}
            disabled={props.disabled}
            open={open}
            onOpen={() => {
                if (!props.disabled)
                    setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => {
                if (value === undefined)
                    return false;
                return option.id === value.id;
            }}
            onInputChange={
                (event, value, reason) => {
                    if (!props.disabled)
                        setActualSearch(value);
                }
            }
            options={props.options}
            getOptionLabel={option => option[props.field] ? option[props.field].toString() : ""}
            groupBy={props.groupBy ? option => option[props.groupBy] : undefined}
            loading={loading}
            disableCloseOnSelect={props.disableCloseOnSelect}
            renderOption={props.useCheckbox ? useCheckbox : undefined}
            renderInput={params => {

                params["inputProps"]["form"] = {
                    autocomplete: 'off'
                };

                return (
                    <TextField
                        {...params}
                        {...props}
                        name={props.name}
                        value={currentValue}
                        error={getError(props).hasError}
                        helperText={getError(props).message}
                        fullWidth
                    />)
            }}
        />
    );
};

CalummaAutoComplete.propTypes = {

    name: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    useCheckbox: PropTypes.bool,

    onChange: PropTypes.func.isRequired,

    values: PropTypes.object,
    errors: PropTypes.object,

    helperText: PropTypes.string
};

CalummaAutoComplete.displayName = 'CalummaAutoComplete';

export default CalummaAutoComplete;
