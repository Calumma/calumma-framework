import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SimpleCard from '../content/simpleCard';
import SimpleDataTable from '../content/simpleDatatable';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        height: "max-content"
    },
    loading: {
        position: "absolute",
        backgroundColor: "#d8d8d896",
        zIndex: 10000,
        height: "100%",
        width: "100%",
        minHeight: "100px"
    }
}));

const SimpleDatatableWrapper = (props) => {

    let classes = useStyles();
    let properties = JSON.parse(JSON.stringify(props));
    delete properties["tableConfig"]

    return (
        <Grid className={classes.root}>
            {
                props.isLoading &&
                    <Skeleton variant="rect" className={classes.loading} animation="wave" />
            }
            <div>
                {
                    props.isCard === true ?
                        <SimpleCard
                            onExpandCard={props.onExpandCard}
                            customCard={props.customCard}
                            setTableConfig={props.setTableConfig}
                            buttons={props.buttons}
                            {...props}
                        /> :
                        <SimpleDataTable {...props} />
                }
            </div>
        </Grid>
    );
};

export default SimpleDatatableWrapper;
