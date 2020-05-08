import React from "react";
import {NumericProperty} from "./NumericTemplate";

// Numeric properties
export const MinProperty = ({...props}) => {
    return <NumericProperty name={"Minimum"} propertyName={"min"} {...props} />;
};

export const MaxProperty = ({...props}) => {
    return <NumericProperty name={"Maximum"} propertyName={"max"} {...props} />;
};

export const StepProperty = ({...props}) => {
    return (
        <NumericProperty name={"Step size"} propertyName={"step"} {...props} />
    );
};

export const MaxLengthProperty = ({...props}) => {
    return (
        <NumericProperty
            name={"Max length"}
            propertyName={"maxlength"}
            {...props}
        />
    );
};

export const DefaultExpansionsProperty = ({...props}) => {
    return (
        <NumericProperty
            name={"Default amount of expansions"}
            propertyName={"default_expansions"}
            {...props}
        />
    );
};

export const MaxExpansionsProperty = ({...props}) => {
    return (
        <NumericProperty
            name={"Default amount of expansions"}
            propertyName={"max_expansions"}
            {...props}
        />
    );
};

export const HoursFromProperty = ({...props}) => {
    return (
        <NumericProperty
            name={"Hours from"}
            propertyName={"hours_from"}
            {...props}
        />
    );
};

export const HoursToProperty = ({...props}) => {
    return (
        <NumericProperty name={"Hours to"} propertyName={"hours_to"} {...props} />
    );
};

export const HoursStepProperty = ({...props}) => {
    return (
        <NumericProperty
            name={"Hours step count"}
            propertyName={"hours_step"}
            {...props}
        />
    );
};

export const WidthProperty = ({...props}) => {
    return <NumericProperty name={"Width"} propertyName={"width"} required={true} {...props} />;
};

export const HeightProperty = ({...props}) => {
    return <NumericProperty name={"Height"} propertyName={"height"} required={true} {...props} />;
};

export const RadiusProperty = ({...props}) => {
    return <NumericProperty name={"Radius"} propertyName={"radius"} {...props} />;
};

export const DensityProperty = ({...props}) => {
    return (
        <NumericProperty name={"Density"} propertyName={"density"} {...props} />
    );
};
