import React, {useContext} from "react";
import {QuestionnaireContext} from "../../contexts/QuestionnaireContext";
import {IconButton, Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { REMOVE_QUESTION } from "../../features/questions/questionsSlice";

const RemoveQuestionButton = ({ question }) => {
  // const { dispatch } = useContext(QuestionnaireContext);
  const dispatch = useDispatch();
  return (
    <Tooltip title="remove">
      <IconButton
        // onClick={() => dispatch({ type: "REMOVE_QUESTION", id: question.id })}>
        onClick={() => dispatch(REMOVE_QUESTION({ id: question.id }))}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveQuestionButton;
