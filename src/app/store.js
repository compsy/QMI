import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import questionReducer from '../features/questionProperties/questionSlice';
import questionsReducer from '../features/questions/questionsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    question: questionReducer,
    questions: questionsReducer,
  },
});
