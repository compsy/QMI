import React from "react";
import TextArrayTemplate from "../TextArrayTemplate/TextArrayTemplate";

// TextArray properties
export const TextOptionsProperty = () => {
    return <TextArrayTemplate propertyName="options" name="Options"/>;
};

export const LabelOptionsProperty = () => {
    return <TextArrayTemplate propertyName="labels" name="Labels"/>;
};
