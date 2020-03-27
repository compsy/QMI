import React, { useContext, useState } from "react";
import Switch from "@material-ui/core/Switch";
import {
  DialogContent,
  FormControlLabel,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

const TextProperty = ({
  newQuestion,
  newQuestionDispatch,
  name,
  propertyName,
  ...props
}) => {
  const handleChange = event => {
    newQuestion[propertyName] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion }
    });
  };

  return (
    <TextField
      autoFocus
      required
      variant="outlined"
      autoComplete="off"
      margin="dense"
      type="text"
      fullWidth
      id={"outlined-basic"}
      value={newQuestion[propertyName]}
      onChange={handleChange}
      label={name}
      {...props}
    />
  );
};
export const TitleProperty = ({ newQuestion, newQuestionDispatch, ...props }) => {
  return (
    <TextProperty
      newQuestion={newQuestion}
      newQuestionDispatch={newQuestionDispatch}
      propertyName={"title"}
      name={"Title"}
      {...props}
    />
  );
};
