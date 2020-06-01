import {createSlice} from "@reduxjs/toolkit";
import {CLEAN_SUPER_QUESTION,} from "../../utils";

export const questionSlice = createSlice({
    name: "question",
    initialState: {},
    reducers: {
        setQuestion: (state, action) => {
            return action.payload;
        },
        setProperty: (state, action) => {
            state[action.payload.property] = action.payload.value;
        },
        setTextArrayField: (state, action) => {
            state[action.payload.property][action.payload.index] =
                action.payload.value;
        },
        setTextArrayElement: (state, action) => {
            state[action.payload.property][action.payload.index] =
                action.payload.value;
        },
        resetAll: (state, action) => {
            return CLEAN_SUPER_QUESTION;
        },
        removeOption: (state, action) => {
            state[action.payload.property] = state[action.payload.property].filter(
                (_, i) => i !== action.payload.index
            );
        },
    },
});

export const {
    setQuestion,
    setProperty,
    setTextArrayField,
    setTextArrayElement,
    removeOption,
} = questionSlice.actions;

export function selectProperty(propertyName) {
    return (state) => state.question[propertyName];
}

export default questionSlice.reducer;
