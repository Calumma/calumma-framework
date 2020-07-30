import React from 'react'
import { Grid } from '@material-ui/core';

const DatatableActionButtons = (props) => {

    return (
        <Grid>
           {
                props.buttons &&
                <Grid container spacing={2}>
                    {
                        props.buttons.map(button => (                  
                            <Grid item>
                                {button()}
                            </Grid>                    
                        ))
                    }
                </Grid>
           }
        </Grid>
    ); 
}

export default  DatatableActionButtons;