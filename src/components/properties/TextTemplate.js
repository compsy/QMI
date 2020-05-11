import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectProperty, setProperty,} from "../../features/question/questionSlice";
import {FilledInput, FormControl, InputLabel, makeStyles,} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    boxy: {
        borderRadius: 0,
        zIndex: 0
    },
    paper: {
        overflow: "auto",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
}));

export const TextProperty = ({
                                 name,
                                 propertyName,
                                 required = false,
                                 ...props
                             }) => {
    const property = useSelector(selectProperty(propertyName));
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(
            setProperty({
                property: propertyName,
                value: event.target.value,
            })
        );
    };

    const classes = useStyles();

    return (
        // <TextField
        //   required={required}
        //   key={propertyName}
        //   fullWidth
        //   variant="filled"
        //   type="text"
        //   id={"outlined-basic"}
        //   value={property}
        //   onChange={handleChange}
        //   label={name}
        //   {...props}
        // />
        // <Paper className={classes.paper} variant="outlined">
        <FormControl fullWidth required={required}>
            <InputLabel variant="filled" style={{userSelect: "none"}}>{name}</InputLabel>
            <FilledInput
                // className={classes.boxy}
                autoComplete="off"
                type="text"
                id={propertyName}
                placeholder={name}
                value={property || ""}
                onChange={handleChange}
                {...props}
            />
            {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
        </FormControl>
        // </Paper>
    );
};
