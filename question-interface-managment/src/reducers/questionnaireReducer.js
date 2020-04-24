import uuid from "uuid/v1";
import {QUESTION_TYPES} from "../components/QuestionTypes";


const reorder = (list, startIndex, endIndex) => {
    let newList = list.slice(0, list.length);
    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);
    return newList;
};

const initialTextOptions = ["option 1" , "option 2","option 3" , "option 4"];
const initialPrioritizedTextOptions = [
    { title: 'option 1', numeric_value: 1 },
    { title: 'option 2', numeric_value: 2 },
    { title: 'option 3', numeric_value: 3 },
    { title: 'option 4', numeric_value: 4 }
];

const copy = (source, destination, droppableSource, droppableDestination) => {
    let newDestination = destination.slice(0, destination.length);
    const item = source[droppableSource.index];

    // initialising question JSONs.
    switch(item.label){
        case "range":
            newDestination.splice(droppableDestination.index, 0, {
                id: uuid(),
                type: item.label,
                title: `untitled ${item.label}`,
                labels: initialTextOptions
            });
            break;
        case "checkbox":
        case "radio":
            newDestination.splice(droppableDestination.index, 0, {
                id: uuid(),
                type: item.label,
                title: `untitled ${item.label}`,
                options: initialTextOptions
            });
            break;
        case "likert":
        case "dropdown":
            newDestination.splice(droppableDestination.index, 0, {
                id: uuid(),
                type: item.label,
                title: `untitled ${item.label}`,
                options: initialPrioritizedTextOptions
            });
            break;
        default:
            newDestination.splice(droppableDestination.index, 0, {
                id: uuid(),
                type: item.label,
                title: `untitled ${item.label}`,
            });
            break;
    }

    return newDestination;
};


export const questionnaireReducer = (state, action) => {
    switch (action.type) {
        case "REORDER":
            return reorder(state, action.source.index, action.destination.index);
        case "CLONE":
            return copy(QUESTION_TYPES, state, action.source, action.destination);
        case "SET_QUESTIONS":
            return action.questions;
        case "ADD_QUESTION":
            const uniq = uuid();
            if (action.type === "range"){
                return [
                    ...state, {
                        id: uniq,
                        type: action.questionType.toLowerCase(),
                        title: "untitled " + action.questionType,
                        labels: ["option 1", "option 2", "option 3", "option 4"]
                    }]
            } else if (action.type === "likert" || action.type === "dropdown" || action.type === "checkbox" || action.type === "radio"){
                return [
                    ...state, {
                        id: uniq,
                        type: action.questionType.toLowerCase(),
                        title: "untitled " + action.questionType,
                        options: ["option 1", "option 2", "option 3", "option 4"]
                    }]
            }
            else {
                return [
                    ...state, {
                        id: uniq,
                        type: action.questionType.toLowerCase(),
                        title: "untitled " + action.questionType,
                    }];
            }
        case "REMOVE_QUESTION":
            return state.filter(question => question.id !== action.id);
        case "REMOVE_ALL":
            return state.filter(question => question.id === action.id);
        case "UPDATE_QUESTION":
            return state.map(question =>
                question.id === action.id ? action.new : question
            );
        default:
            return state;
    }
};
