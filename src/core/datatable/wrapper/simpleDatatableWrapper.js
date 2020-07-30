import React from 'react'
import SimpleCard from '../content/simpleCard';
import SimpleDataTable from '../content/simpleDatatable';

const SimpleDatatableWrapper = (props) => {

    let properties = JSON.parse(JSON.stringify(props));

    delete properties["tableConfig"]

    return (
        props.isCard === true ?
            <SimpleCard 
                onExpandCard={props.onExpandCard} 
                customCard={props.customCard} 
                setTableConfig={props.setTableConfig}
                buttons={props.buttons}
                {...props} 
            /> :
            <SimpleDataTable {...props} />
    );
};

export default  SimpleDatatableWrapper;
