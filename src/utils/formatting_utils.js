import Grid from "@material-ui/core/Grid";
import React from "react";

export const alignInGrid = (spacing, ...renderedComponents) => {
    return <Grid container direction="row" alignItems="center" spacing={spacing}>
        {renderedComponents.map((component, index) => (
            <Grid key={index} item>
                {component}
            </Grid>))}
    </Grid>
};