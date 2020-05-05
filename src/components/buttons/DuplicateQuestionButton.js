import React, {useContext} from "react";
import {Button, IconButton, Tooltip} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {QuestionnaireContext} from "../../contexts/QuestionnaireContext";
import { useDispatch } from "react-redux";
import { DUPLICATE_QUESTION } from "../../features/questions/questionsSlice";



const EditQuestionButton = ({ question, index }) => {

    // const { dispatch } = useContext(QuestionnaireContext);
    const dispatch = useDispatch();

    return (
        <>
            <Tooltip title="duplicate">
                <IconButton
                    // onClick={() => dispatch({ type: "DUPLICATE_QUESTION", question: question })}>
                    onClick={() => dispatch(DUPLICATE_QUESTION({ question: question }))}>
                    <FileCopyIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default EditQuestionButton;