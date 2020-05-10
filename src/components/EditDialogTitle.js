import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {UPDATE_QUESTION} from "../features/questions/questionsSlice";
import store from "../app/store";
import {CLEAN_SUPER_QUESTION} from "../utils";
import {postprocessQuestion} from "./properties/postprocessor";
import {TitleProperty} from "./properties/TextProperties";
import {setQuestion} from "../features/question/questionSlice";

/**
 * In general, this is a stripped down version of the edit dialog, containing one property: title.
 * */
const EditQuestionTitleField = ({question, onComplete}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        function handleKeyDown(event) {
            // noinspection FallThroughInSwitchStatementJS
            switch (event.code) {
                case "Enter":
                    updateTitle(event);
              // eslint-disable-next-line no-fallthrough
                case "Escape":
                    close();
              // eslint-disable-next-line no-fallthrough
                default:
                    break;
            }
        }
        function updateTitle(event) {
            event.preventDefault();

            const state = store.getState();
            const newQuestion = postprocessQuestion(state.question);
            dispatch(UPDATE_QUESTION({id: question.id, new: newQuestion}))
        }

        function close() {
            // To free up memory, as after the field is closed, keystrokes should not be handled with handleKeyDown anymore.
            document.removeEventListener("keydown", handleKeyDown);
            onComplete();
        }
        document.addEventListener("keydown", handleKeyDown);
        dispatch(setQuestion({...CLEAN_SUPER_QUESTION, ...question}));
    }, [dispatch, onComplete, question]);

    return <TitleProperty key={question.id}/>
};
export default EditQuestionTitleField;