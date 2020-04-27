import React, {useContext} from "react";
import {Button, IconButton, Tooltip} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {QuestionnaireContext} from "../../contexts/QuestionnaireContext";



const EditQuestionButton = ({ question, index }) => {

    const { dispatch } = useContext(QuestionnaireContext);

    return (
        <>
            <Tooltip title="duplicate">
                <IconButton
                    onClick={() => dispatch({ type: "DUPLICATE_QUESTION", question: question })}>
                    <FileCopyIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default EditQuestionButton;