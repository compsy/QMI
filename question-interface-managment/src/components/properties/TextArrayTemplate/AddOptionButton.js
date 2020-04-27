import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {
  selectProperty,
  setProperty,
} from "../../../features/questionProperties/questionSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    height: "50px",
  },
}));

const AddOptionButton = () => {
  const type = useSelector(selectProperty("type"));
  const dispatch = useDispatch();

  const handleAddOptionClick = () => {
    dispatch(
      setProperty({
        property: propertyName,
        value: [...property, ""], // converted to { title: "" } if options
      })
    );
  };

  const classes = useStyles();
  return (
    <Tooltip title={type === "range" ? "add a label" : "add an option"}>
      <Button
        className={classes.button}
        fullWidth
        disableElevation
        variant="contained"
        color="primary"
        onClick={handleAddOptionClick}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
};

export default AddOptionButton;
