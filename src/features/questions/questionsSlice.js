import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuid/v1";
import { QUESTION_TYPES } from "../../components/QuestionTypes";
import { INITIAL_QUESTIONNAIRE_CONTEXT } from "../../utils";

const reorder = (list, startIndex, endIndex) => {
  let newList = list.slice(0, list.length);
  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);
  return newList;
};

const initialTextOptions = ["option 1" , "option 2","option 3" , "option 4"];

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

const getQuestionTemplateByAction = (action, state) =>{
  const uniq = uuid();
  switch(action.type){
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

export const questionsSlice = createSlice({
  name: "questions",
  initialState: INITIAL_QUESTIONNAIRE_CONTEXT,
  reducers: {
    REORDER: (state, action) => {
      return reorder(
        state,
        action.payload.source.index,
        action.payload.destination.index
      );
    },
    CLONE: (state, action) => {
      return copy(
        QUESTION_TYPES,
        state,
        action.payload.source,
        action.payload.destination
      );
    },
    SET_QUESTIONS: (state, action) => {
      return action.payload.questions;
    },
    ADD_QUESTION: (state, action) => {
      return getQuestionTemplateByAction(action.payload, state);
    },
    DUPLICATE_QUESTION: (state, action) => {
      return duplicateQuestion(action.payload, state);
    },
    REMOVE_QUESTION: (state, action) => {
      return state.filter((question) => question.id !== action.payload.id);
    },
    REMOVE_ALL: (state, action) => {
      return [];
    },
    UPDATE_QUESTION: (state, action) => {
      return state.map((question) =>
        question.id === action.payload.id ? action.payload.new : question
      );
    },
  },
});

export const {
  REORDER,
  CLONE,
  SET_QUESTIONS,
  ADD_QUESTION,
  DUPLICATE_QUESTION,
  REMOVE_QUESTION,
  REMOVE_ALL,
  UPDATE_QUESTION,
} = questionsSlice.actions;

export default questionsSlice.reducer;
