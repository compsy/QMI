import uuid from "uuid/v1";
import {QUESTION_TYPES} from "../components/QuestionTypes";


const reorder = (list, startIndex, endIndex) => {
    let newList = list.slice(0, list.length);
    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);
    return newList;
};

const initialTextOptions = ["option 1", "option 2", "option 3", "option 4"];

const copy = (source, destination, droppableSource, droppableDestination) => {
    let newDestination = destination.slice(0, destination.length);
    const item = source[droppableSource.index];

    // initialising question JSONs.
    switch (item.label) {
        case "range":
            newDestination.splice(droppableDestination.index, 0, {
                id: uuid(),
                type: item.label,
                title: `untitled ${item.label}`,
                min: "0",
                max: "100",
                step: "1",
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
                options: initialTextOptions
            });
            break;
        case "raw":
            newDestination.splice(droppableDestination.index, 0, {
                id: uuid(),
                type: item.label,
                content: "<p>This is an untitled raw question</p>"
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

const getQuestionTemplateByAction = (action, state) => {
    const uniq = uuid();
    switch (action.type) {
        case "range":
            return [
                ...state, {
                    id: uniq,
                    type: action.questionType.toLowerCase(),
                    title: "untitled " + action.questionType,
                    min: "0",
                    max: "100",
                    step: "1",
                    labels: ["option 1", "option 2", "option 3", "option 4"]
                }];
        case "checkbox":
        case "radio":
            return [
                ...state, {
                    id: uniq,
                    type: action.questionType.toLowerCase(),
                    title: "untitled " + action.questionType,
                    options: initialTextOptions
                }];
        case "likert":
        case "dropdown":
            return [
                ...state, {
                    id: uniq,
                    type: action.questionType.toLowerCase(),
                    title: "untitled " + action.questionType,
                    options: initialTextOptions
                }];
        case "raw":
            return [
                ...state, {
                    id: uniq,
                    type: action.questionType.toLowerCase(),
                    content: "<p>This an is untitled raw question</p>"
                }];
        default:
            return [
                ...state, {
                    id: uniq,
                    type: action.questionType.toLowerCase(),
                    title: "untitled " + action.questionType,
                }];
    }
};

const duplicateQuestion = (action, state) => {
    return [
        ...state, {
            ...action.question,
            id: uuid()
        }];
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
            return getQuestionTemplateByAction(action, state);
        case "DUPLICATE_QUESTION":
            return duplicateQuestion(action, state);
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
