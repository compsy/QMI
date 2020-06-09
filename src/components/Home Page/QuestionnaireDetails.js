import React, { useEffect, useState } from 'react'
import { API_STATUS } from '../../features/API/ApiHandler'
import { auth_config } from '../../features/API/auth_config'
import { useAuth0 } from '../Authentication Dialog/react-auth0-spa'
import { SET_QUESTIONS } from '../../features/questions/questionsSlice'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { SET_METADATA } from '../../features/questionnaire/questionnaireMetadataSlice'
import {
    QuestionnaireDetailsCard, QuestionnaireDetailsErrorCard,
    QuestionnaireDetailsLoadingCard,
    QuestionnaireDetailsNoQuestionnaireCard
} from "./QuestionnaireDetailsCard";

const LOCALE_EN = {
    noQuestionnaireTitle: 'No questionnaire is selected.',
    noQuestionnaireSubtitle: "Please click one of the questionnaires listed on the left to view details.",
    editQuestionnaireButtonText: "Edit Questionnaire",
    questions: "questions",
    answers: "answers"
}

export const QuestionnaireDetails = ({questionnaireKey}) => {
    const locale = LOCALE_EN;
    const {getIdTokenClaims, isAuthenticated} = useAuth0();
    const [questionnaireState, setQuestionnaireState] = useState({status: API_STATUS.INIT, body: null});
    const dispatch = useDispatch();
    useEffect(() => {
        if(questionnaireKey == null || questionnaireState.status === API_STATUS.LOADING) return;
        if(questionnaireState.status === API_STATUS.INIT || questionnaireKeyHasChanged()){
            retrieveQuestionnaire(questionnaireKey);
        }
    })

    const questionnaireKeyHasChanged =
        () => questionnaireState.status === API_STATUS.IDLE && questionnaireState.body.key !== questionnaireKey;

    const loadQuestionnaireIntoState = () => {
        localStorage.clear();
        const questionnaire = questionnaireState.body;
        questionnaire.content.questions.forEach(question => question.type === 'raw' ? question.id = uuid() : null);
        dispatch(SET_QUESTIONS({questions: questionnaire.content.questions}));
        dispatch(SET_METADATA({metadata: {key: questionnaire.key, name: questionnaire.name, title: questionnaire.title}}));
    }
    const getQuestionnaireByKeyAsync = async (key) => {
        const itc = await getIdTokenClaims();
        const unirest = require('unirest');
        return unirest('GET', auth_config.base + '/api/v1/questionnaire/' + key)
            .headers({
                'Authorization': `Bearer ${itc.__raw}`
            })
    }
    const retrieveQuestionnaire = (key) => {
        if(!isAuthenticated || questionnaireState.status === API_STATUS.LOADING) return;
        setQuestionnaireState({status: API_STATUS.LOADING, body: null})
        getQuestionnaireByKeyAsync(key)
            .catch(error => setQuestionnaireState({status: API_STATUS.ERROR, body: error}))
            .then(response => {
                if(response.status >= 400){
                    setQuestionnaireState({status: API_STATUS.ERROR, body: response.body});
                }
                setQuestionnaireState({status: API_STATUS.IDLE, body: response.body});
            })
            .catch(error => setQuestionnaireState({status: API_STATUS.ERROR, body: error}));
    }

    const getIdleCard = () =>{
        const questionnaire = questionnaireState.body;
        return <QuestionnaireDetailsCard
            title={questionnaire.name}
            subtitle={"key: " + questionnaire.key}
            extra={
                `${questionnaire.content.questions.length} ${locale.questions} | ${questionnaire.content.scores.length} ${locale.answers}.`}
            editAvailable
            onClick={loadQuestionnaireIntoState}
        />
    }

    // eslint-disable-next-line default-case
    switch (questionnaireState.status){
        case API_STATUS.INIT:
            return <QuestionnaireDetailsNoQuestionnaireCard />
        case API_STATUS.LOADING:
            return <QuestionnaireDetailsLoadingCard />
        case API_STATUS.ERROR:
            return <QuestionnaireDetailsErrorCard message={questionnaireState.body}/>
        case API_STATUS.IDLE:
            return getIdleCard();
    }

};

