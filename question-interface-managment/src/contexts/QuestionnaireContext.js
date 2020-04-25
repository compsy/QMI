import React, {createContext, useReducer} from 'react';
import {questionnaireReducer} from '../reducers/questionnaireReducer';

export const QuestionnaireContext = createContext();

const QuestionnaireContextProvider = (props) => {
  const [questions, dispatch] = useReducer(questionnaireReducer, [
    {id: 'v1', type: "range", title: "Hello BOI", labels: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v2', type: "radio", title: "Hello Kitty", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v3', type: "checkbox", title: "untitled checkbox", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v4', type: "range", title: "Hey Arnold", labels: ["passing rate", "my grade"]},
    {type: "raw", content:"<p class=\"flow-text\">Hier staat een demo vragenlijst voor u klaar. Dit staat in een RAW tag</p>"},
  ]);
  return (
    <QuestionnaireContext.Provider value={{questions, dispatch}}>
      {props.children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireContextProvider;
