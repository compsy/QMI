import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import { useDispatch } from "react-redux";
import { UPDATE_QUESTION } from "../features/questions/questionsSlice";

const EditQuestionTitleField = ({question, onComplete}) =>{
  const [title, setTitle] = useState(question.title);
  // const { dispatch } = useContext(QuestionnaireContext);
  const dispatch = useDispatch();

  function handleKeyDown(event){
    // noinspection FallThroughInSwitchStatementJS
    switch (event.code) {
      case "Enter":
        updateTitle();
      case "Escape":
        close();
    }
  }
  document.addEventListener("keydown", handleKeyDown);

  function updateGlobal(){
    // dispatch({ type: "UPDATE_QUESTION", id: question.id, new: question });
    dispatch(UPDATE_QUESTION({ id: question.id, new: question }))
  }
  function updateTitle(){
    if(title === question.title) return;
    question.title = title;
    updateGlobal();
  }

  const handleChange = (e) => setTitle(e.target.value);

  const close = () => {
    // To free up memory, as after the field is closed, keystrokes should not be handled with handleKeyDown anymore.
    document.removeEventListener("keydown", handleKeyDown);
    onComplete();
  };

  return <TextField autoFocus id="standard-full-width" fullWidth
                    defaultValue={question.title} onChange={handleChange}>
    {question.title}
  </TextField>
};
export default EditQuestionTitleField;