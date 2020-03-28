import React, {useContext, useState} from "react";
import Switch from "@material-ui/core/Switch";
import {DialogContent, FormControlLabel, IconButton, InputAdornment} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";


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
}

export const HiddenProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestionDispatch={newQuestionDispatch}
    newQuestion={newQuestion}
    name={"Hidden"}
    propertyName={"hidden"}
    {...props}
  />
)


export const ShowOtherwiseProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestionDispatch={newQuestionDispatch}
    newQuestion={newQuestion}
    name={"Show 'otherwise: ...'"}
    propertyName={"show_otherwise"}
    {...props}
  />
)

export const RequiredProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestionDispatch={newQuestionDispatch}
    newQuestion={newQuestion}
    name={"Required"}
    propertyName={"required"}
    {...props}
  />
)


const BooleanProperty = ({newQuestion, newQuestionDispatch,
                           name,
                           propertyName,
                           ...props}) => {

  const handleChange = event => {
    newQuestion[propertyName] = event.target.checked;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion }
    });
  };

  const switchComponent = <Switch
    checked={newQuestion[propertyName]}
    color="primary"
    onChange={handleChange}
    name={propertyName}
  />;


  return (
    <FormControlLabel
      control={switchComponent}
      label={name}
      {...props}
    />
  );
};


const ArrayProperty = ({newQuestion, newQuestionDispatch, name, propertyName, type}) => {
  const handleChange = event => {
    newQuestion[propertyName] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion}
    });
  };


  return <TextField
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
  />
};
export const TextOptionsProperty = ({newQuestion, newQuestionDispatch}) => {
  const [optionAdded, setOptionAdded] = useState(false);

  const handleChange = (index, event) => {
    newQuestion.options[index] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion}
    });
  };

  const handleAddOptionClick = event => {
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: [...newQuestion.options, ""] }
    });
    setOptionAdded(true);
  }

  const handleRemoveOptionClick = (index, event) => {
    let newOptions = [...newQuestion.options];
    newOptions.splice(index, 1);
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: newOptions }
    });
  };

  const renderOptions = () => newQuestion.options.map((option, index) => (
    <TextField
      autoFocus={optionAdded ? index === newQuestion.options.length - 1 : false}
      style={{ margin: "0.2em 0" }}
      placeholder={newQuestion.type === "range" ? "label" : "option"}
      type="text"
      fullWidth
      value={option}
      onChange={e => handleChange(index, e)}
      InputProps={getInputProps(index)}
    />
  ))

  const getInputProps = (index) => ({
    endAdornment: (
      <InputAdornment position="end" margin="0">
        <IconButton
          edge="end"
          onClick={e => handleRemoveOptionClick(index, e)}
          style={{margin: "0", padding: "0"}}
        >
          <DeleteIcon/>
        </IconButton>
      </InputAdornment>
    )
  });

  return <>
    <Button onClick={handleAddOptionClick}>
      add {newQuestion.type === "range" ? "label" : "option"}
    </Button>
    <Box
      fullWidth
      // height="200px"
      height="200px"
      overflow="scroll"
      style={{ margin: "0", overflowX: "hidden" }}
    >
      {renderOptions()}
    </Box>
  </>
}


