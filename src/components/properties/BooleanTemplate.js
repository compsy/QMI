import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProperty, setProperty } from "../../features/questionProperties/questionSlice";
import { Switch, FormControlLabel } from "@material-ui/core";

export const BooleanProperty = ({ name, propertyName, ...props }) => {

  const property = useSelector(selectProperty(propertyName));
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(setProperty({property: propertyName, value: !property}))
  };

  const switchComponent = (
    <Switch
      checked={property || false}
      color="primary"
      onChange={handleChange}
      name={propertyName}
    />
  );

  return <FormControlLabel control={switchComponent} label={name} style={{ userSelect: "none" }} {...props} />;
};
