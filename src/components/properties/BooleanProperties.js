import React from "react";
import {BooleanProperty} from "./BooleanTemplate";

// Boolean properties
export const HiddenProperty = ({...props}) => {
    return <BooleanProperty name={"Hidden"} propertyName={"hidden"} {...props} />;
};

export const ShowOtherwiseProperty = ({...props}) => {
    return (
        <BooleanProperty
            name={"Show 'otherwise: ...'"}
            propertyName={"show_otherwise"}
            {...props}
        />
    );
};

export const RequiredProperty = ({...props}) => {
    return (
        <BooleanProperty name={"Required"} propertyName={"required"} {...props} />
    );
};

export const TodayProperty = ({...props}) => {
    return <BooleanProperty name={"Today"} propertyName={"today"} {...props} />;
};

export const SectionEndProperty = ({...props}) => {
    return (
        <BooleanProperty
            name={"QuestionsList marks a section end"}
            propertyName={"section_end"}
            {...props}
        />
    );
};
