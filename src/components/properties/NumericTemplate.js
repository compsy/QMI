import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProperty,
  setProperty,
} from "../../features/question/questionSlice";
import { TextField } from "@material-ui/core";

export const NumericProperty = ({ name, propertyName, ...props }) => {
  const property = useSelector(selectProperty(propertyName));
  const dispatch = useDispatch();

  /*
  const [valid, setValid] = useState(false);

  const validate = () => !isNaN(parseInt(property)) ||
    property === undefined ||
    property === "";
*/

  useEffect(() => {
    //setValid(validate());
  }, [property]);

  const handleChange = (event) => {
    dispatch(
      setProperty({ property: propertyName, value: event.target.value })
    );
    //setValid(valid);
  };

  return (
    <TextField
      key={propertyName}
      //error={!valid}
      variant="filled"
      // margin="dense"
      type="number"
      fullWidth
      //id={"outlined-error-helper-text"}
      value={property || ""}
      //helperText={valid ? "" : "Please use numbers only."}
      onChange={handleChange}
      label={name}
      {...props}
    />
  );
};
