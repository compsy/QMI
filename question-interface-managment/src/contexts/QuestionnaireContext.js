import React, { createContext, useReducer } from 'react';
import { questionnaireReducer } from '../reducers/questionnaireReducer';

export const QuestionnaireContext = createContext();

const QuestionnaireContextProvider = (props) => {
  const [questions, dispatch] = useReducer(questionnaireReducer, [
    {id: 'v1', type: "radio", title: "untitled radio", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v2', type: "checkbox", title: "untitled checkbox", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v3', type: "range", title: "untitled range", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v4', type: "likert", title: "untitled likert", options: ["option 1", "option 2", "option 3", "option 4"]},
  ]);
  return (
    <QuestionnaireContext.Provider value={{questions, dispatch}}>
      {props.children}
    </QuestionnaireContext.Provider>
  );
}
 
export default QuestionnaireContextProvider;