import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProperty, setProperty} from "../../../../features/State Management/questionSlice";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {v4 as uuidv4} from "uuid";
import DateFnsUtils from "@date-io/date-fns";

export const DateProperty = ({name, propertyName, ...props}) => {

    const property = useSelector(selectProperty(propertyName));
    const dispatch = useDispatch();

    const handleChange = (date) => {
        dispatch(setProperty({property: propertyName, value: date}));
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                key={uuidv4()}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={name}
                value={property || undefined}
                onChange={handleChange}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
                {...props}
            />
        </MuiPickersUtilsProvider>
    );
};


