import React from "react";
import { TextArrayProperty } from "./TextArrayTemplate";

// TextArray properties
export const TextOptionsProperty = () => {
  return <TextArrayProperty propertyName="options" name="Options" />;
};

export const LabelOptionsProperty = () => {
  return <TextArrayProperty propertyName="labels" name="Labels" />;
};
