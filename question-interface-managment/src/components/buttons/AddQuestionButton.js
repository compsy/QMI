import React, {useContext} from "react";
import {QuestionnaireContext} from "../../contexts/QuestionnaireContext";
import {Button} from "@material-ui/core";

const AddQuestionButton = () => {
  const { dispatch } = useContext(QuestionnaireContext);
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => dispatch({ type: "ADD_QUESTION", questionType: "radio" })}
        style={{ margin: "0.5em auto" }}
      >
        add question
      </Button>
    </div>
  );
};

export default AddQuestionButton;
