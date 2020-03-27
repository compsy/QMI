import React, {useContext, useState} from "react";
import Switch from "@material-ui/core/Switch";
import {DialogContent, FormControlLabel, IconButton, InputAdornment} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

const IsRequiredProperty = (newQuestion) => {
  return <BooleanProperty
    newQuestion={newQuestion}
    name={"Required"}
    propertyName={"required"}
  />
}

const IsHiddenProperty = (onChange) => {
  return <BooleanProperty
    onChange={onChange}
    name={"Hidden"}
    propertyName={"hidden"}
  />
}


const OtherwiseLabel = () => {
  return <TextProperty
    question={}
    propertyName = {"otherwise_label"}
    name = {"Otherwise Text"}
  />
}

const OtherwiseTooltip = () => {
  return <TextProperty
    question={}
    propertyName = {"otherwise_tooltip"}
    name = {"Otherwise Tooltip"}
  />
}

const ShowOtherwiseProperty = () => {
  return <BooleanProperty
    question={}
    propertyName = {"otherwise_tooltip"}
    name = {"Otherwise Tooltip"}
  />
}

const NumericMinProperty = () => {
  return <NumericProperty
    question={}
    propertyName = {"min"}
    name = {"Minimum Value"}
  />
}

const NumericMaxProperty = () => {
  return <NumericProperty
    question={}
    propertyName = {"max"}
    name = {"Maximum Value"}
  />
}

const NumericStepProperty = () => {
  return <NumericProperty
    question={}
    propertyName = {"step"}
    name = {"Step"}
  />
}
const LabelsProperty = () =>{
  return <ArrayProperty
    question={}
    propertyName={"labels"}
    name={"Labels"}
    type={String.prototype}
  />
}

const PlaceHolderProperty = () => {
  return <TextProperty
    question={}
    propertyName = {"placeholder"}
    name = {"Placeholder"}
  />
};

const HintProperty = () => {
  return <TextProperty
    question={}
    propertyName = {"hint"}
    name = {"Hint"}
  />
};

const MaxLengthProperty = () => {
  return <NumericProperty
    question={}
    propertyName = {"maxlength"}
    name = {"Maximum Length"}
  />
};


const BooleanProperty = (name, propertyName, newQuestion) => {
  const [property, setProperty] = useState(false);

  const handleChange = event => {
    // setting the current value locally in the component state
    setProperty(event.target.checked);
    // updating the 'newQuestion', which contains all changes compared to 'question'
    newQuestion.property = property;
  };

  const switchComponent = <Switch
    checked={property}
    onChange={handleChange}
    name={property}
  />;

  return <FormControlLabel
    value="Top"
    control={switchComponent}
    label={name}
 />
}

const TextProperty = (question, name, propertyName, defaultValue) => {
  const [property, setProperty] = useState(false);
  const handleChange = event => {
    setProperty(event.target.checked);
    question[propertyName] = property;
  };

  return <TextField id={"outlined-basic"}
    value={defaultValue}
    control={switchComponent}
    label={name}
  />
}

// TODO: Make sure it only accepts numbers
const NumericProperty = (question, name, propertyName, defaultValue) => {
  const [property, setProperty] = useState(false);
  const handleChange = event => {
    setProperty(event.target.checked);
    question[propertyName] = property;
  };

  return <TextField id={"outlined-basic"}
                    value={defaultValue}
                    control={switchComponent}
                    label={name}
  />
}


// Used for e.g. options, labels
const ArrayProperty = (question, name, propertyName, type) => {}
const DateProperty = (question, name, propertyName) => {}

// Make sure it verifies the regex
const RegexProperty = (question, name, propertyName) => {}

