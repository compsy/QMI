import React, { createContext, useReducer } from "react";
import { newQuestionReducer } from "../reducers/newQuestionReducer";

export const NewQuestionContext = createContext();

const NewQuestionContextProvider = props => {
  const [newQuestion, newQuestionDispatch] = useReducer(newQuestionReducer, {title: "untitled", options: []});
  return (
    <NewQuestionContext.Provider value={{ newQuestion, newQuestionDispatch }}>
      {props.children}
    </NewQuestionContext.Provider>
  );
};

export default NewQuestionContextProvider;
