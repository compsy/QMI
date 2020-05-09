import React, {createContext, useReducer} from 'react';
import {questionnaireReducer} from '../reducers/questionnaireReducer';

export const QuestionnaireContext = createContext();

const QuestionnaireContextProvider = (props) => {
    const [questions, dispatch] = useReducer(questionnaireReducer, [
        // {
        //     id: 'v1',
        //     type: "range",
        //     title: "Hello BOI",
        //     labels: ["option 1", "option 2", "option 3", "option 4", "option5"]
        // },
        // {id: 'v2', type: "radio", title: "Hello Kitty", options: ["option 1", "option 2", "option 3", "option 4"]},
        // {
        //     id: 'v3',
        //     type: "checkbox",
        //     title: "untitled checkbox",
        //     options: ["option 1", "option 2", "option 3", "option 4"]
        // },
        // {id: 'v4', type: "range", hidden: "true", title: "Hey Arnold", labels: ["passing rate"]},
        // {
        //     id: 'v5',
        //     type: "raw",
        //     content: "<p class=\"flow-text\">Hier staat een demo vragenlijst voor u klaar. Dit staat in een RAW tag</p>"
        // },
        // {
        //     id: "v26",
        //     type: "dropdown",
        //     title: "dropdown",
        //     label: "Hey",
        //     tooltip: "Bye",
        //     options: ["option 1", "option 2", "option 3", "option 4"]
        // },
        // {
        //     id: "v32",
        //     type: "radio",
        //     shows_otherwise: "false",
        //     title: "Voorbeeld van een radio",
        //     options: [{title: "Ja", shows_question: ["v2"]}, {title: "Nee", shows_question: ["v4"]}]
        // }

    ]);
    return (
        <QuestionnaireContext.Provider value={{questions, dispatch}}>
            {props.children}
        </QuestionnaireContext.Provider>
    );
};

export default QuestionnaireContextProvider;
