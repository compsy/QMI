import {makeStyles, Typography} from "@material-ui/core";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Grid from "@material-ui/core/Grid";
import {QuestionnaireDetails} from "./QuestionnaireDetails";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    card: {
        height: "100%"
    },
    titleBar: {
        background: '#27496d'
    },
    tile: {}
}));
export const QuestionnaireView = () => {
    // This is merely for debugging and emulation. An actual reference to the questionnaires need to be thought of.
    const [current, setCurrent] = useState(0);

    const QuestionnaireList = () => {
        const ActionIcon = ({value}) => {
            return alignInGrid(0,
                <IconButton onClick={() => setCurrent(value)}><InfoIcon/></IconButton>,
                <IconButton
                    onClick={() => {console.log("Load questionnaire data into state, redirect to editor");}}>
                    <EditIcon/>
                </IconButton>
            );
        };

        return <GridList cols={4} spacing={10}>
            {/* todo: fill with actual questionnaires */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(value => {
                return <GridListTile key={value} className={classes.tile}>
                    <img src={"logo512.png"} alt=""/>
                    <GridListTileBar className={classes.titleBar}
                                     title={"Questionnaire " + value}
                                     actionIcon={<ActionIcon value={value}/>}/>
                </GridListTile>
            })}
        </GridList>
    };

    const classes = useStyles();
    return <Grid container spacing={10} style={{padding: 100}}>
        <Grid item xs={8}>
            <QuestionnaireList/>
        </Grid>
        <Grid item xs={4}>
            <QuestionnaireDetails current={current}/>
        </Grid>
    </Grid>
};


export const alignInGrid = (spacing, ...renderedComponents) => {
    return <Grid container direction="row" alignItems="center" spacing={spacing}>
        {renderedComponents.map((component, index) => (
            <Grid key={index} item>
                {component}
            </Grid>))}
    </Grid>
};