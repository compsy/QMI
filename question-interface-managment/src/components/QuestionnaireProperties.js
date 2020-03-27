import React, {useState} from "react";
import Switch from "@material-ui/core/Switch";
import {FormControlLabel} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const IsRequiredProperty = (onChange) => {
  return <BooleanProperty
    onChange={onChange}
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


const BooleanProperty = (name, propertyName, onChange) => {
  const [property, setProperty] = useState(false);

  const handleChange = event => {
    setProperty(event.target.checked);
    onChange(property)
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
