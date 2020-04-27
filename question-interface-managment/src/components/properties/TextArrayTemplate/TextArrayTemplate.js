import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Box, Grid, Paper, Typography } from "@material-ui/core";
import {
  selectProperty,
  setProperty,
} from "../../../features/questionProperties/questionSlice";
import EachOption from "./EachOption";

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
const TextArrayTemplate = ({ name, propertyName }) => {
  // react-redux hooks for accessing state.question.options or state.question.labels
  const property = useSelector(selectProperty(propertyName));
  const dispatch = useDispatch();

  // if "options" or "labels" undefined, then default to []
  useEffect(() => {
    if (property === undefined) {
      dispatch(setProperty({ property: propertyName, value: [] }));
    }
  }, [property]);

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper} variant="outlined" elevation={0}>
        {property.length > 0 ? (
          property.map((_, index) => (
            <EachOption propertyName={propertyName} index={index} />
          ))
        ) : (
          <NoElementsSign propertyName={propertyName} />
        )}
      </Paper>
      <Box textAlign="center">
        <AddOptionButton onClick={handleAddOptionClick} />
      </Box>
    </>
  );
};

export default TextArrayTemplate;

//

const NoElementsSign = ({ propertyName }) => {
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
          style={{ userSelect: "none" }}
        >{`no ${propertyName} provided`}</Typography>
      </Grid>
    </Grid>
  );
};
