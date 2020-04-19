import React, {createContext, useReducer} from 'react';
import {questionnaireReducer} from '../reducers/questionnaireReducer';

export const QuestionnaireContext = createContext();

const QuestionnaireContextProvider = (props) => {
  const [questions, dispatch] = useReducer(questionnaireReducer, [
    {id: 'v1', type: "range", title: "Hello BOI", labels: ["option 1", "option 222", "option 3", "option 4"]},
    {id: 'v1', type: "radio", title: "Hello Kitty", options: ["option 1", "option 222", "option 3", "option 4"]},
    {id: 'v2', type: "checkbox", title: "untitled checkbox", options: ["option 1", "option 2", "option 3", "option 4"]},
    {
      section_start: 'De hoofddoelen',
      hidden: true,
      id: 'v3',
      type: "range",
      min: 0,
      max: 200,
      step: 5,
      title: 'Was het voor jou duidelijk ?',
      tooltip: 'some tooltip',
      labels: ['helemaal niet duidelijk', 'heel duidelijk'],

      // only since for debug rendering purposes, delete in final
      // options: ['helemaal niet duidelijk', 'heel duidelijk'],
      section_end: true
    },
    {id: 'v4', type: "likert", title: "untitled likert",
      options: [
        { title: 'hobby/sport'},
        { title: 'werk'},
        { title: 'vriendschap'}
        ]},
    {id: 'v5', type: "dropdown", title: "untitled dropdown",
      options: [
        { title: 'hobby/sport', numeric_value: 0 },
        { title: 'werk', numeric_value: 25 },
        { title: 'vriendschap', numeric_value: 50 }
      ]},

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
      step: 10,
      title: 'Was het voor jou duidelijk ?',
      tooltip: 'some tooltip',
      labels: ['helemaal niet duidelijk', 'heel duidelijk'],

      // only since for debug rendering purposes, delete in final
      // options: ['helemaal niet duidelijk', 'heel duidelijk'],
      section_end: true
    },

    {
      section_start: 'Tot slot',
      hidden: true,
      id: 'v8',
      type: "textfield",
      title: 'Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?',
      tooltip: 'some tooltip',
      default_value: 'Niks',
      pattern: '[a-z]{1,10}',
      hint: 'Must be a lowercase word between 1 and 10 characters in length',
      placeholder: 'Place holder',
      section_end: true,
    },
    {id: 'v9', type: "number", title: "untitled number", placeholder: 5132, min: 10, max: 100, maxlength: 4},

    {
      id: 'v10',
      type: 'time',
      hours_from: 3,
      hours_to: 6,
      hours_step: 1,
      title: 'Hoeveel tijd heb je deze week besteed aan de begeleiding van deze student movai pilon?',
    },

  ]);
  return (
    <QuestionnaireContext.Provider value={{questions, dispatch}}>
      {props.children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireContextProvider;
