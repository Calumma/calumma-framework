import { useState } from 'react';


const useForm = (initialValues, callback) => {

    const [values, setValues] = useState(initialValues);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
            callback();
    };

    const handleChange = (event, inputName, inputValue) => {  
        const name = (event === undefined && inputName) ? inputName : event.target.name;
        const value = (event === undefined) ? inputValue : event.target.value;

        if(name.includes('.')){
            const propertyLevels = name.split(".");
            handleMultiLevelPropertyChange(propertyLevels, value);
        }else
            setValues(values => ({ ...values, [name]: value }));
    };

    const handleMultiLevelPropertyChange = (propertyLevels, value) => {
        let obj_test = {};
        let aux_obj = value;
        let x = (propertyLevels.length - 1)
        for(; x >= 1; x--){
            let key = propertyLevels[x];
            obj_test = getMultiLevelPropertyValue(propertyLevels.slice(0, x));
            obj_test = { ...obj_test, [key]: aux_obj };
            aux_obj = obj_test;
            obj_test = {};
        }
        obj_test = aux_obj
        
        setValues(values => ({ ...values, [propertyLevels[0]]: obj_test }));
    };

    const getMultiLevelPropertyValue = (propertyLevels) => {
        let x = 0;
        let value = values;
        for(; x < propertyLevels.length; x++){
            value = value[propertyLevels[x]];
        }
        return value;
    };
    
    const handleCheckedChange = (event) => {
        let name = event.target.name;
        let status = event.target.checked;
 
        if(name.includes('.')){
            const propertyLevels = name.split(".");
            handleMultiLevelPropertyChange(propertyLevels, status);
        }else
            setValues(values => ({ ...values, [name]: status }));
    };

    const addContact = () => {
        setValues(values => ({ ...values, "contacts": values.contacts.concat([{contactType: "", contactText: ""}])}));
    };

    return {
        values,
        setValues,
        handleChange,
        handleCheckedChange,
        addContact,
        handleSubmit
    };
};

export default useForm;
