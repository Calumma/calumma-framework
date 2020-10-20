import React, { useState } from 'react'
import { ExpansionPanel, Grid, Menu, ExpansionPanelDetails, IconButton, Typography, CardContent, Card, LinearProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next'
import _ from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SimplePagination from '../pagination/simplePagination'


const SimpleDataTable = (props) => {
    const { t } = useTranslation();

    const CellValue = (props) => (
        <Grid container item md={3} xs={6}>
            <Grid item>
                <Typography variant="h6">
                    {props.title}:&nbsp;
                </Typography>
            </Grid>
            <Grid item>
                <Grid container alignItems="center" style={{ "height": "100%" }}>
                    <Typography align="center" key={index + "-" + props.title + "-" + props.value}>
                        {props.value}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    const Cell = (props) => {
        if (typeof props.cellConfig === 'object') {
            if (props.cellConfig.derivated) {
                return (
                    <CellValue title={t(props.cellConfig.name)} value={props.cellConfig.transmute(props.row)} />
                );
            }
            else if (!props.cellConfig.isHidden) {
                return (
                    <CellValue title={t(props.cellConfig.name)} value={props.cellConfig.transmute(props.row[props.cellConfig.name])} />
                );
            }
            return <></>;
        } else if (typeof props.cellConfig === 'string') {
            return (
                <CellValue title={t(props.cellConfig)} value={props.row[props.cellConfig]} />
            );
        } else {
            return (
                <Typography align="center" key={index + "-" + props.row.id}>
                </Typography>
            );
        }
    };

    const Options = (props) => {

        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleClick = event => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: 200,
                        },
                    }}
                >
                    {
                        props.buttons.map(button => (
                            button({
                                page: props.page,
                                index: props.row.id,
                                row: props.row,
                                base_url: props.base_url,
                                history: props.history,
                                tableConfig: props.tableConfig,
                                setTableConfig: props.setTableConfig,
                                isOptions: true,
                                handleClose: handleClose
                            })
                        ))
                    }
                </Menu>
            </div>
        );
    };

    const CardExpansionPanel = (props) => {

        const [isExpanded, setIsExpanded] = useState(false);
        const [expandedContent, setExpandedContent] = useState(<LinearProgress />);

        const onExpandCard = (props) => {
            setExpandedContent(props.onExpandCard({ row: props.row, filters: props.filters, setTableConfig: props.setTableConfig }));
            setIsExpanded(true);
        }

        return (
            <ExpansionPanel expanded={isExpanded} style={{ marginBottom: "2vh" }}>
                <Grid container style={{ minHeight: "80px", marginRight: "5px" }}>
                    <Grid item container style={{ padding: "10px" }} direction="column" xs={11}>
                        {
                            props.customCard ? props.customCard(props) :
                                <Grid container item alignContent="center" xs={12}>
                                    {
                                        projections.map((cell, index) => (
                                            <Cell row={props.row} cellConfig={cell} />
                                        ))
                                    }
                                </Grid>
                        }
                    </Grid>

                    <Grid item container xs={1} direction="column" alignItems="flex-end">
                        {
                            (props.buttons && props.buttons.length > 0) &&
                            <Grid item container justify="flex-end" alignItems="flex-start" xs={6}>
                                <Options {...props} />
                            </Grid>
                        }
                        {
                            props.onExpandCard &&
                            <Grid item container justify="flex-end" alignItems="flex-end" xs={(!(props.buttons && props.buttons.length > 0)) ? 12 : 6}>
                                {
                                    isExpanded ?
                                        <IconButton onClick={() => setIsExpanded(false)} >
                                            <ExpandLessIcon />
                                        </IconButton> :
                                        <IconButton onClick={() => onExpandCard(props)}>
                                            <ExpandMoreIcon />
                                        </IconButton>
                                }
                            </Grid>
                        }
                    </Grid>

                </Grid>
                {
                    props.onExpandCard && (
                        <ExpansionPanelDetails>
                            {expandedContent}
                        </ExpansionPanelDetails>
                    )
                }
            </ExpansionPanel>
        );
    };

    let projections = _.cloneDeep(props.projections);
    const index = projections.indexOf("id");

    if (index > -1) {
        projections.splice(index, 1);
    }

    return (
        <>
            {
                (props.data.content && props.data.content.length > 0) ?
                    <>
                        {
                            props.data.content.map(row => (
                                <CardExpansionPanel {...props} row={row} />
                            ))
                        }
                        < SimplePagination
                            total={props.data.totalElements}
                            page={props.data.pageable.pageNumber}
                            size={props.data.pageable.pageSize}
                            tableConfig={props.tableConfig}
                            setTableConfig={props.setTableConfig}
                        />
                    </> :
                    <Card>
                        <CardContent>
                            <Grid container alignContent="center">
                                <Typography variant="h5">
                                    Nenhum evento encontrado.
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
            }

        </>
    );
};

export default SimpleDataTable;
