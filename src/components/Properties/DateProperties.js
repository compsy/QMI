import React from "react";
import {DateProperty} from "./DateTemplate";
import {useSelector} from "react-redux";

// Date Properties
export const DefaultDateProperty = ({...props}) => {
    const today = useSelector((state) => state.question.today);
    return (
        <DateProperty
            disabled={today || false}
            name="Default Date"
            propertyName="default_date"
            {...props}
        />
    );
};

export const MinDateProperty = ({...props}) => {
    return <DateProperty name="Minimum Date" propertyName="min" {...props} />;
};

export const MaxDateProperty = ({...props}) => {
    return <DateProperty name="Maximum Date" propertyName="max" {...props} />;
};
