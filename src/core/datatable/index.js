/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import SimpleDataTableWrapper from './wrapper/simpleDatatableWrapper';
import PropTypes from 'prop-types';
import useDatatableTransmutation from './hooks/useDatatableTransmutation'

const DataTableTemplate = (props) => {
    const [tableConfig, setTableConfig] = useState(props.queryParams);
    const [orderBy, setOrderBy] = useState(props.orderBy);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.setQueryParams) {
            props.setQueryParams(tableConfig);
        }
    }, [tableConfig, props]);

    useEffect(() => {
        if (orderBy.length === 2 && orderBy.filter(x => x.field === "id").length > 0) {
            setOrderBy(orderBy.filter(x => x.field !== "id"));
        } else if (orderBy.length === 0) {
            setOrderBy([{ field: "id", order: "asc" }]);
        }
    }, [orderBy]);

    useEffect(() => {
        setIsLoading(true)
        props.loadData(props.projections, props.filters, tableConfig, orderBy)
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [props.queryParams, tableConfig, orderBy, props.filters]);

    return (
        <Grid container>
            <Grid container item xs={12} direction="column">
                <Grid item>
                    <SimpleDataTableWrapper
                        {...props}
                        data={props.data}
                        tableConfig={tableConfig}
                        setTableConfig={setTableConfig}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        isLoading={isLoading}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};


DataTableTemplate.propTypes = {

    loadData: PropTypes.func.isRequired,
    projections: PropTypes.array.isRequired,
    queryParams: PropTypes.object.isRequired,
    setQueryParams: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,

    data: PropTypes.object,
    orderBy: PropTypes.object,

    isCard: PropTypes.bool,
    onExpandCard: PropTypes.element,
    customCard: PropTypes.element,

    buttons: PropTypes.array,
    history: PropTypes.object,
    filters: PropTypes.object,

    //depreacted
    base_url: PropTypes.string
}

DataTableTemplate.defaultProps = {
    data: { content: [], totalElements: 0, pageable: { pageSize: 20, pageNumber: 0 } },
    orderBy: [{ field: "id", order: "asc" }]
}

export default DataTableTemplate;
export { useDatatableTransmutation }