import React, { createContext, useReducer } from 'react';
import { questionnaireReducer } from '../reducers/questionnaireReducer';

export const QuestionnaireContext = createContext();

const QuestionnaireContextProvider = (props) => {
  const [questions, dispatch] = useReducer(questionnaireReducer, [
    {id: 'v1', type: "radio", title: "untitled radio", options: ["option 1", "option 222", "option 3", "option 4"]},
    {id: 'v2', type: "checkbox", title: "untitled checkbox", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v3', type: "range", title: "untitled range", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v4', type: "likert", title: "untitled likert", options: ["option 1", "option 2", "option 3", "option 4"]},
    {id: 'v5', type: "select", title: "untitled select", options: ["option 1", "option 2", "option 3", "option 4"]},

    { section_start: 'Tot slot',
      hidden: true,
      id: 'v6',
      type: 'textarea',
      title: 'Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?',
      tooltip: 'some tooltip',
      placeholder: 'Place holder',
      section_end: true
    },

    {
      section_start: 'De hoofddoelen',
      hidden: true,
      id: 'v7',
      type: "range",
      min: 0,
      max: 200,
      step: 1,
      title: 'Was het voor jou duidelijk ?',
      tooltip: 'some tooltip',
      labels: ['helemaal niet duidelijk', 'heel duidelijk'],

      // only since for debug rendering purposes, delete in final
      options: ['helemaal niet duidelijk', 'heel duidelijk'],
      section_end: true
    },

    {
      section_start: 'Tot slot',
      hidden: true,
      id: 'v8',
      type: 'textfield',
      title: 'Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?',
      tooltip: 'some tooltip',
      default_value: 'Niks',
      pattern: '[a-z]{1,10}',
      hint: 'Must be a lowercase word between 1 and 10 characters in length',
      placeholder: 'Place holder',
      section_end: true
    },
  ]);
  return (
    <QuestionnaireContext.Provider value={{questions, dispatch}}>
      {props.children}
    </QuestionnaireContext.Provider>
  );
}

export default QuestionnaireContextProvider;
