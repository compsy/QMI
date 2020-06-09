import {configureStore} from '@reduxjs/toolkit';
import questionReducer from './features/question/questionSlice';
import questionsReducer from './features/questions/questionsSlice';
import utilitiesReducer from './features/utilities/utilitiesSlice';
import questionnaireMetadataReducer from "./features/questionnaire/questionnaireMetadataSlice";

export default configureStore({
    reducer: {
        question: questionReducer,
        questions: questionsReducer,
        utilities: utilitiesReducer,
        questionnaireMetadata: questionnaireMetadataReducer
    },
});
