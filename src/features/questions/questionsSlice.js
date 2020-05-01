import { createSlice } from "@reduxjs/toolkit";
import { initial3 } from "../../utils";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: initial3,
  reducers: {
    addQuestionAtIndex: (state, action) => {
      let newState = state.slice();
      newState.splice(action.index, 0, action.item);
      return newState;
    },
    removeQuestionAtIndex: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    setQuestionAtIndex: (state, action) => {
      return state.map((question, index) =>
        index === action.payload.index ? action.payload.question : question
      );
    },
  },
});

export const {
  addQuestionAtIndex,
  removeQuestionAtIndex,
  setQuestionAtIndex
} = questionsSlice.actions;

export default questionsSlice.reducer;
