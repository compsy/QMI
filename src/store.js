import {configureStore} from '@reduxjs/toolkit';
import questionReducer from './features/State Management/questionSlice';
import questionsReducer from './features/State Management/questionsSlice';
import utilitiesReducer from './features/State Management/utilitiesSlice';
import questionnaireMetadataReducer from "./features/State Management/questionnaireMetadataSlice";

export default configureStore({
    reducer: {
        question: questionReducer,
        questions: questionsReducer,
        utilities: utilitiesReducer,
        questionnaireMetadata: questionnaireMetadataReducer
    },
});
