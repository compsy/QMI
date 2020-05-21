import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {useDispatch} from "react-redux";
import {DUPLICATE_QUESTION} from "../../features/questions/questionsSlice";


const EditQuestionButton = ({question, index}) => {

    // const { dispatch } = useContext(QuestionnaireContext);
    const dispatch = useDispatch();
    console.log(index)
    return (
        <>
            <Tooltip title="duplicate">
                <IconButton
                    data-cy={Object.is(index, NaN) ? 'duplicateRaw' : "duplicate" + (index + 1)}
                    // data-cy={"duplicate" + (index + 1)}
                    // onClick={() => dispatch({ type: "DUPLICATE_QUESTION", question: question })}>
                    onClick={() => dispatch(DUPLICATE_QUESTION({question: question}))}>
                    <FileCopyIcon/>
                </IconButton>
            </Tooltip>
        </>
    );
};

export default EditQuestionButton;