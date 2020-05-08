import {Button, makeStyles, Menu, MenuItem} from "@material-ui/core";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_QUESTION} from "../../../features/questions/questionsSlice";

const useStyles = makeStyles((theme) => ({
    boxy: {
        borderRadius: 0,
    },
    paper: {
        height: "250px",
        overflow: "auto",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
    button: {
        marginTop: theme.spacing(2),
        height: "50px",
    },
    noneBox: {
        width: "100%",
        height: "100%",
    },
    menuItem: {
        outline: "none",
    },
    showsHidesButtons: {
        transform: "scale(0.8)",
        // marginLeft: theme.spacing(1),
    },
}));

const LinkQuestions = (option) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseItem = (question) => {
        setAnchorEl(null);
        toggleQuestion(question);
    };

    const currentQuestion = useSelector((state) => state.question);

    // const dispatch = useDispatch();

    let questions = useSelector((state) => state.questions.map(question => {
        return question.type === "raw" || question.id === state.question.id ? undefined : question.id;
    }));

    questions = questions.filter(id => id !== undefined);

    const dispatch = useDispatch();

    const toggleQuestion = (newId) => {
        let newQuestion = JSON.parse(JSON.stringify(currentQuestion));
        newQuestion.options[option.index].shows_question.push(newId);
        dispatch(UPDATE_QUESTION({id: currentQuestion.id, new: newQuestion}));
    };

    return (
        <>
            <Button
                // className={classes.showsHidesButtons}
                disableElevation
                size="small"
                variant="contained"
                onClick={handleClick}
            >
                +
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                {questions.map((id) => {
                    return (
                        <MenuItem onClick={(e) => toggleQuestion(id)}>{id}</MenuItem>
                    )
                })}
            </Menu>
        </>
    );
};

export default LinkQuestions;