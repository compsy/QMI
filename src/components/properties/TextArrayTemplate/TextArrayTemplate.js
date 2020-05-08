import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {selectProperty, setProperty,} from "../../../features/question/questionSlice";
import EachOption from "./EachOption";
import AddOptionButton from "./AddOptionButton";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: "250px",
        overflow: "auto",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
    noneBox: {
        width: "100%",
        height: "100%",
    },
}));

// main file for src/components/properties/TextArrayTemplate
const TextArrayTemplate = ({name, propertyName}) => {
    const property = useSelector(selectProperty(propertyName));
    const dispatch = useDispatch();

    // if "options" or "labels" undefined, then default to []
    useEffect(() => {
        if (property === undefined) {
            dispatch(setProperty({property: propertyName, value: []}));
        }
    }, [property]);

    // no need to add as {title: ""} (handled in ./EachOption.js)
    const handleAddOptionClick = () => {
        dispatch(
            setProperty({
                property: propertyName,
                value: [...property, ""],
            })
        );
    };

    const classes = useStyles();
    return (
        <>
            <Paper elevation={0} variant="outlined" className={classes.paper}>
                {property.length > 0 ? (
                    property.map((_, index) => (
                        <EachOption key={index} propertyName={propertyName} index={index}/>
                    ))
                ) : (
                    <NoElementsSign propertyName={propertyName}/>
                )}
            </Paper>
            <Box textAlign="center">
                <AddOptionButton onClick={handleAddOptionClick}/>
            </Box>
        </>
    );
};

export default TextArrayTemplate;

//

const NoElementsSign = ({propertyName}) => {
    const classes = useStyles();
    return (
        <Grid
            className={classes.noneBox}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <Typography
                    variant="body1"
                    style={{userSelect: "none"}}
                >{`no ${propertyName} provided`}</Typography>
            </Grid>
        </Grid>
    );
};
