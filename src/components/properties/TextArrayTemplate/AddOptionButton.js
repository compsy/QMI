import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  selectProperty,
} from "../../../features/question/questionSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    height: "50px",
  },
}));

const AddOptionButton = (props) => {
  const type = useSelector(selectProperty("type"));
  const classes = useStyles();
  return (
    <Tooltip title={type === "range" ? "add a label" : "add an option"}>
      <Button
        disableElevation
        variant="contained"
        fullWidth
        color="primary"
        className={classes.button}
        {...props}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
};


export default AddOptionButton;
