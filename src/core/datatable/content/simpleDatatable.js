import React, { useState, useEffect } from 'react'
import { Paper, Table, TableHead, TableCell, TableRow, TableBody, Typography, TableSortLabel } from '@material-ui/core';
import SimplePagination from '../pagination/simplePagination'
import { useTranslation } from 'react-i18next'
import _ from 'lodash';

const SimpleDataTable = (props) => {
    const { t } = useTranslation();

    const Cell = (props) => {
        if ((typeof props.cellConfig === 'object') && props.cellConfig.derivated) {
            return (<TableCell key={index + "-" + props.row.id}> {props.cellConfig.transmute(props.row)} </TableCell>);

        } else if ((typeof props.cellConfig === 'object') && props.cellConfig.chameleoned) {
            if (!props.cellConfig.isHidden) {
                return (<TableCell key={index + "-" + props.row.id}> {props.cellConfig.transmute(props.row, props.cellConfig.name)} </TableCell>);
            }
            return <></>;

        } else if (typeof props.cellConfig === 'object') {
            if (!props.cellConfig.isHidden) {
                return (<TableCell key={index + "-" + props.row.id}> {props.cellConfig.transmute(props.row[props.cellConfig.name])} </TableCell>);
            }
            return <></>;

        } else if (typeof props.cellConfig === 'string') {
            return (<TableCell key={index + "-" + props.row.id}> {props.row[props.cellConfig]} </TableCell>);
        } else {
            return (<TableCell key={index + "-" + props.row.id}></TableCell>);
        }
    };

    const isInOrderBy = (field) => {
        let isInOrderBy = false;
        props.orderBy.map(x => {
            if (x["field"] === field)
                isInOrderBy = true;
            return x;
        });

        return isInOrderBy;
    }

    const getOrderDirection = (field) => {
        return props.orderBy.filter(x => x["field"] === field)[0].order;
    }

    const setOrderBy = (field) => {
        if (isInOrderBy(field)) {
            if (getOrderDirection(field) === 'asc') {
                props.setOrderBy(props.orderBy.map(x => {
                    if (x["field"] === field)
                        x["order"] = 'desc'
                    return x;
                }))
            } else {
                props.setOrderBy(props.orderBy.filter(x => x["field"] !== field))
            }
        } else {
            props.setOrderBy(props.orderBy.concat([{ "field": field, "order": props.orderBy.order === 'desc' ? 'desc' : 'asc' }]))
        }
    }

    const drawTitleWithOrderBy = (name, value) => {
        return (
            <TableCell key={name}>
                <TableSortLabel
                    active={isInOrderBy(value)}
                    direction={isInOrderBy(value) ? getOrderDirection(value) : 'asc'}
                    onClick={() => setOrderBy(value)}
                >
                    <Typography color="textSecondary" variant="overline" style={{ fontSize: "0.8rem" }}>
                        {name}
                    </Typography>
                </TableSortLabel>
            </TableCell>
        )
    }

    const drawTitleWithoutOrderBy = (name, value) => {
        return (
            <TableCell key={name}>
                <Typography color="textSecondary" variant="overline" style={{ fontSize: "0.8rem" }}>
                    {name}
                </Typography>
            </TableCell>
        )
    }

    const drawTitle = (cellConfig) => {
        if (typeof cellConfig === 'object') {
            if (!cellConfig.isHidden && !cellConfig.derivated) {
                return (drawTitleWithOrderBy(t(cellConfig.name), cellConfig.name));
            } else if (cellConfig.derivated) {
                return (drawTitleWithoutOrderBy(t(cellConfig.name), cellConfig.name));
            }
        } else if (typeof cellConfig === 'string') {
            return (drawTitleWithOrderBy(t(cellConfig), cellConfig));
        } else {
            return "";
        }
    };

    let projections = _.cloneDeep(props.projections);
    var index = projections.indexOf("id");

    if (index > -1) {
        projections.splice(index, 1);
    }

    const [isSelected, setIsSelected] = useState(Array.apply(null, { length: props.data.content.length }));

    useEffect(() => {
        if (props.data.length !== isSelected.length) {
            setIsSelected(Array.apply(null, { length: props.data.content.length }));
        }
    }, [props.data]);

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow key="dataTableHeaders">
                        {
                            projections.map(title => (
                                drawTitle(title)
                            ))
                        }
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        props.data.content.map((row, index) => {
                            return (
                                <TableRow key={row.id} hover={true} selected={isSelected[index]}>
                                    {
                                        projections.map((cell, index) => (
                                            <Cell key={index} row={row} cellConfig={cell} />
                                        ))
                                    }

                                    <TableCell align="right" key={row.id + "-" + "buttons"} style={{ padding: "12px" }}>
                                        {
                                            props.buttons ?
                                                props.buttons.map(button => (
                                                    button({
                                                        page: props.page,
                                                        index: row.id,
                                                        row: row,
                                                        base_url: props.base_url,
                                                        history: props.history,
                                                        tableConfig: props.tableConfig,
                                                        setTableConfig: props.setTableConfig,
                                                        rowIndex: index,
                                                        setIsRowSelected: setIsSelected,
                                                        isRowSelected: isSelected
                                                    })
                                                )) : ""
                                        }
                                    </TableCell>
                                </TableRow>);
                        })
                    }
                </TableBody>
            </Table>
            <SimplePagination
                total={props.data.totalElements}
                page={props.data.pageable.pageNumber}
                size={props.data.pageable.pageSize}
                tableConfig={props.tableConfig}
                setTableConfig={props.setTableConfig}
            />
        </Paper>
    );
};

export default SimpleDataTable;
