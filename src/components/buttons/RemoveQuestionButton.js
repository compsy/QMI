import React from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_QUESTION, REMOVE_BY_MAP} from "../../features/questions/questionsSlice";
import { clearMapWithQuestion } from "../properties/postprocessor";
import store from "../../app/store";
import { removeByKey } from "../../features/utilities/utilitiesSlice";

const RemoveQuestionButton = ({question}) => {
    const dispatch = useDispatch();
    const handleClick = (event) => {
        removeAllWithKey(question);
        clearMapWithQuestion(question);
        // if (question.type === "checkbox" || question.type === "radio") {
        // }
        console.log('showsMap: ', store.getState().utilities.showsMap)
        console.log('hidesMap: ', store.getState().utilities.hidesMap)
        dispatch(REMOVE_QUESTION({id: question.id}));
    };
    return (
        <Tooltip data-cy={"remove" + question.id} title="remove">
            <IconButton onClick={handleClick}>
                <DeleteIcon/>
            </IconButton>
        </Tooltip>
    );
};

export default RemoveQuestionButton;

export const removeAllWithKey = (question) => {
    const utilities = store.getState().utilities;
    const showsMap = utilities.showsMap;
    const hidesMap = utilities.hidesMap;
    if (showsMap[question.id] !== undefined && showsMap[question.id].length > 0) {
        for (let i=0; i<showsMap[question.id].length; i++) {
            const { qid, oid } = showsMap[question.id][i];
            store.dispatch(REMOVE_BY_MAP({type: "showsMap", key: question.id, qid, oid }))
        }
        store.dispatch(removeByKey({key: question.id, type: "showsMap"}));
    }
    if (hidesMap[question.id] !== undefined && hidesMap[question.id].length > 0) {
        for (let i=0; i<hidesMap[question.id].length; i++) {
            const { qid, oid } = hidesMap[question.id][i];
            store.dispatch(REMOVE_BY_MAP({type: "hidesMap", key: question.id, qid, oid }))
        }
        store.dispatch(removeByKey({key: question.id, type: "hidesMap"}));
    }
}