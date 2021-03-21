import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, InputLabel, makeStyles, MenuItem, Paper, Select,} from "@material-ui/core";
import {capitalize, QUESTION_TYPES} from "../../../utils";
import {setProperty} from "../../../features/State Management/questionSlice";

const useStyles = makeStyles((theme) => ({
    paper: {
        overflow: "auto",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
    field: {
        borderRadius: 0
    }
}));

export default function TypeProperty() {
    const type = useSelector((state) => state.question.type);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Paper className={classes.paper} variant="outlined">
            <FormControl variant="filled" onClick={(e) => e.stopPropagation()}>
                <InputLabel id="type-label" style={{userSelect: "none"}}>Type</InputLabel>
                <Select
                    className={classes.field}
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={type || ""}
                    onChange={(e) =>
                        dispatch(setProperty({property: "type", value: e.target.value}))
                    }
                >
                    {QUESTION_TYPES.map((obj) => (
                        <MenuItem key={obj.type} value={obj.type} disabled={obj.disabled}>
                            {capitalize(obj.type)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    );
}
