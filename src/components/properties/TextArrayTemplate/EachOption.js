import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FilledInput, FormControl, IconButton, InputAdornment, InputLabel, makeStyles,} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EachOptionMenu from "./EachOptionMenu";
import {removeOption, setTextArrayElement, setTextArrayField} from "../../../features/question/questionSlice";
import {CLEAN_SUPER_OPTION} from "../../../utils";
import LinkQuestions from "./LinkQuestions";

const useStyles = makeStyles((theme) => ({
    boxy: {
        borderRadius: 0,
    },
}));

const EachOption = ({propertyName, index}) => {
    return (
        // <Slide in direction="right">
        <OptionInputField propertyName={propertyName} index={index}/>
        // </Slide>
    );
};

export default EachOption;

/* ----- USED IN EachOption BELOW ----- */

const OptionInputField = ({propertyName, index}) => {
    const option = useSelector((state) => state.question[propertyName][index]);
    const dispatch = useDispatch();

    // makes sure the options are in object format (unless range type)
    useEffect(() => {
        if (propertyName === "options" && typeof option === "string") {
            dispatch(
                setTextArrayElement({
                    property: propertyName,
                    index: index,
                    value: {...CLEAN_SUPER_OPTION, title: option},
                })
            );
        }
    }, [option]);

    const handleChange = (index, event) => {
        if (propertyName === "options") {
            dispatch(
                setTextArrayElement({
                    property: propertyName,
                    index: index,
                    value: {...option, title: event.target.value},
                })
            );
        } else {
            dispatch(
                setTextArrayField({
                    property: propertyName,
                    index: index,
                    value: event.target.value,
                })
            );
        }
    };

    const classes = useStyles();
    return (
        <FormControl fullWidth required>
            <InputLabel variant="filled" style={{userSelect: "none"}}>
                {propertyName === "labels"
                    ? `Label ${index + 1}`
                    : `Option ${index + 1}`}
            </InputLabel>
            <FilledInput
                // required
                className={classes.boxy}
                autoFocus
                autoComplete="off"
                type="text"
                id={`option-${index + 1}`}
                placeholder={
                    propertyName === "labels"
                        ? "Enter range label here.."
                        : "Enter option title here.."
                }
                value={(propertyName === "labels" ? option : option["title"]) || ""}
                onChange={(e) => handleChange(index, e)}
                endAdornment={<EndButtons propertyName={propertyName} index={index}/>}
            />
        </FormControl>
    );
};

const RemoveButton = ({ index }) => {
    const dispatch = useDispatch();
    const handleRemoveOptionClick = (index) => {
        dispatch(removeOption({property: propertyName, index: index}));
    };
    return (
        <IconButton size="small" onClick={() => handleRemoveOptionClick(index)}>
            <DeleteIcon/>
        </IconButton>
    );
}

const EndButtons = ({propertyName, index}) => {
    return (
        <InputAdornment position="end">
            {propertyName === "options" && (
                <>
                    {/*<EachOptionShows/>*/}
                    {/*<EachOptionHides />*/}
                    <LinkQuestions index={index}/>
                    <EachOptionMenu propertyName={propertyName} index={index}/>
                </>
            )}
            <RemoveButton index={index} />
        </InputAdornment>
    );
};

