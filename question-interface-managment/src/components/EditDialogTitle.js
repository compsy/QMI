import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";

const EditQuestionTitleField = ({question, onComplete}) =>{
  const [title, setTitle] = useState(question.title);
  const { dispatch } = useContext(QuestionnaireContext);

  const handleKeyDown = event => {
    switch (event.code) {
      case "Enter":
        updateTitle();
      case "Escape":
        close();
    }
  }
  document.addEventListener("keydown", handleKeyDown);

  const updateTitle = () =>{
    question.title = title;
    dispatch({ type: "UPDATE_QUESTION", id: question.id, new: question });
  }

  const handleChange = (e) => setTitle(e.target.value)

  const close = () => {
    onComplete();

    // To free up memory, as after the field is closed, keystrokes should not be handled with handleKeyDown anymore.
    document.removeEventListener("keydown", handleKeyDown);
  }

  return <TextField defaultValue={question.title} onChange={handleChange}>{question.title}</TextField>
}
export default EditQuestionTitleField;