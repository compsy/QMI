import React from "react";
import {NumericProperty} from "./NumericTemplate";

// Numeric properties
export const MinProperty = ({...props}) => {
    return (
        <div data-cy={"min"}>
            <NumericProperty name={"Minimum"} propertyName={"min"} {...props} />
        </div>
    );
};

export const MaxProperty = ({...props}) => {
    return (
        <div data-cy={"max"}>
            <NumericProperty name={"Maximum"} propertyName={"max"} {...props} />
        </div>
    );
};

export const StepProperty = ({...props}) => {
    return (
        <div data-cy={"step"}>
            <NumericProperty name={"Step size"} propertyName={"step"} {...props} />
        </div>
    );
};

export const MaxLengthProperty = ({...props}) => {
    return (
        <div data-cy={"maxlength"}>
            <NumericProperty
                name={"Max length"}
                propertyName={"maxlength"}
                {...props}
            />
        </div>
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
        <div data-cy={"hours_from"}>
            <NumericProperty
                name={"Hours from"}
                propertyName={"hours_from"}
                {...props}
            />
        </div>
    );
};

export const HoursToProperty = ({...props}) => {
    return (
        <div data-cy={"hours_to"}>
            <NumericProperty name={"Hours to"} propertyName={"hours_to"} {...props} />
        </div>
    );
};

export const HoursStepProperty = ({...props}) => {
    return (
        <div data-cy={"hours_step"}>
            <NumericProperty
                name={"Hours step count"}
                propertyName={"hours_step"}
                {...props}
            />
        </div>
    );
};

export const WidthProperty = ({...props}) => {
    return <NumericProperty name={"Width"} propertyName={"width"} required={true} {...props} />
};

export const HeightProperty = ({...props}) => {
    return (
        <div data-cy={"height"}>
            <NumericProperty name={"Height"} propertyName={"height"} required={true} {...props} />
        </div>
    );
};

export const RadiusProperty = ({...props}) => {
    return (
        <div data-cy={"radius"}>
            <NumericProperty name={"Radius"} propertyName={"radius"} {...props} />
        </div>
    );
};

export const DensityProperty = ({...props}) => {
    return (
        <div data-cy={"density"}>
            <NumericProperty name={"Density"} propertyName={"density"} {...props} />
        </div>
    );
};
