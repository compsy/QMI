import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {useDispatch} from "react-redux";
import {DUPLICATE_QUESTION} from "../../features/questions/questionsSlice";


const DuplicateQuestionButton = ({question, index}) => {
    const dispatch = useDispatch();
    return (
        <Tooltip title="duplicate">
            <IconButton
                data-cy={Object.is(index, NaN) ? 'duplicateRaw' : "duplicate" + (index + 1)}
                onClick={() => dispatch(DUPLICATE_QUESTION({question: question}))}>
                <FileCopyIcon/>
            </IconButton>
        </Tooltip>
    )
    ;
};

export default DuplicateQuestionButton;