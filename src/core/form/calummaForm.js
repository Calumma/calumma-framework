import React, { useEffect, useState, useRef } from 'react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptBrLocale from "date-fns/locale/pt-BR";
import PropTypes from 'prop-types';

const CalummaInnerForm = (props) => {

    let modifiedElements = [];
    const [newElements, setNewElements] = useState([]);

    const setValuesToCalummaInputLeafs = (node) => {
        if (!node.props) {
            return node;
        }
        if (!node.props.children) {
            if (node.type.displayName && node.type.displayName.includes("Calumma")) {
                return React.cloneElement(node, { "values": props.values, "errors": props.errors });
            }
            return node;
        } else {
            return React.Children.toArray(node.props.children)
                .map(element => {
                    if (element.props && element.props.children)
                        return React.cloneElement(element, { children: setValuesToCalummaInputLeafs(element) });
                    else
                        return setValuesToCalummaInputLeafs(element);
                });
        }
    }

    const submit = (event) => {
        event.preventDefault();
        props.setErrors({});
        let aditionalParams = { abortEarly: false };

        if (props.context) {
            aditionalParams["context"] = props.context;
        }

        if (props.validator)
            return (
                props.validator.validate(props.values, aditionalParams)
                    .then(() =>
                        props.submit()
                    ).catch(err => {
                        let actualErrors = {};
                        err.inner.map(error => {
                            actualErrors[error.path] = { hasError: true, message: error.message }
                        });
                        props.setErrors(actualErrors);
                    })
            );

        return (
            props.submit()
        );
    };

    useEffect(() => {
        React.Children.toArray(props.children).map(element =>
            modifiedElements.push(React.cloneElement(element, { children: setValuesToCalummaInputLeafs(element) })));
        setNewElements(modifiedElements);
    }, [props.children, props.context]);

    return (
        <form onSubmit={submit}>
            {newElements}
        </form>
    );
};

const CalummaForm = (props) => {
    let properties = Object.assign({}, props);
    let alertMessage = useRef(null);
    delete properties.children;

    if(Object.keys(props.errors).length > 0 && props.errorAlert && alertMessage.current != null){
        window.scrollTo(0, alertMessage.current.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
            <div>
                <div ref={alertMessage}>
                    {
                        (Object.keys(props.errors).length > 0 && props.errorAlert) ?
                            props.errorAlert : ""
                    }
                </div>
                <CalummaInnerForm {...properties}>
                    <React.Fragment>
                        {props.children}
                    </React.Fragment>
                </CalummaInnerForm>
            </div>
        </MuiPickersUtilsProvider>
    );
};

CalummaForm.propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    validator: PropTypes.object,
    context: PropTypes.object
};

export default CalummaForm;
