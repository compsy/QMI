import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'
import { REMOVE_BY_MAP, REMOVE_QUESTION } from '../../../features/State Management/questionsSlice'
import { clearMapWithQuestion } from '../../../utils/postprocessor'
import store from '../../../store'
import { removeByKey } from '../../../features/State Management/utilitiesSlice'

const RemoveQuestionButton = ({ question, index }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        removeAllWithKey(question)
        clearMapWithQuestion(question)
        console.log('showsMap: ', store.getState().utilities.showsMap)
        console.log('hidesMap: ', store.getState().utilities.hidesMap)
        dispatch(REMOVE_QUESTION({ id: question.id }))
    }
    return (
        <Tooltip data-cy={"remove" + (index + 1)} title="remove">
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
        for (let i = 0; i < showsMap[question.id].length; i++) {
            const {qid, oid} = showsMap[question.id][i];
            store.dispatch(REMOVE_BY_MAP({type: "showsMap", key: question.id, qid, oid}))
        }
        store.dispatch(removeByKey({key: question.id, type: "showsMap"}));
    }
    if (hidesMap[question.id] !== undefined && hidesMap[question.id].length > 0) {
        for (let i = 0; i < hidesMap[question.id].length; i++) {
            const {qid, oid} = hidesMap[question.id][i];
            store.dispatch(REMOVE_BY_MAP({type: "hidesMap", key: question.id, qid, oid}))
        }
        store.dispatch(removeByKey({key: question.id, type: "hidesMap"}));
    }
}