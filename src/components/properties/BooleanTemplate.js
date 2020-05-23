import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProperty, setProperty} from "../../features/question/questionSlice";
import {FormControlLabel, Switch} from "@material-ui/core";

export const BooleanProperty = ({name, propertyName, ...props}) => {

    const property = useSelector(selectProperty(propertyName));
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(setProperty({property: propertyName, value: !property}))
    };

    const switchComponent = (
        <Switch
            data-cy={propertyName}
            checked={property || false}
            color="primary"
            onChange={handleChange}
            name={propertyName}
        />
    );

    return <FormControlLabel control={switchComponent} label={name} style={{userSelect: "none"}} {...props} />;
};
