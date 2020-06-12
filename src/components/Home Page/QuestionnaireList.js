import {API_STATUS} from "../../features/API/ApiHandler";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import React, {useEffect, useState} from "react";
import {auth_config} from "../../features/API/auth_config";
import {useAuth0} from "../Authentication Dialog/react-auth0-spa";
import {QuestionnaireCard} from "./QuestionnaireCard";
import {generateQuestionnaireListStatusMessage} from "./QuestionnaireListStatusMessage";

export const LOCALE_EN = {
    retrievingQuestionnaires: "Retrieving questionnaires",
    serverCannotBeReached: "The server cannot be reached.",
    noAdminError: "You need to be an admin to use this feature.",
    noQuestionnaires: "No questionnaires are available.",
    loggingIn: "Logging in",
}



export const QuestionnaireList = ({setCurrentQuestionnaireKey}) => {
    const locale = LOCALE_EN;
    const {isAuthenticated, getIdTokenClaims, loading} = useAuth0();
    const [questionnaireListState, setQuestionnaireListState] = useState({status: API_STATUS.INIT, body: []});
    useEffect(() => {
        if (questionnaireListState.status === API_STATUS.INIT) {
            retrieveQuestionnaires();
        }
    });

    const getAllQuestionnairesAsync = async () => {
        const itc = await getIdTokenClaims();
        const unirest = require('unirest');
        return unirest('GET', auth_config.base + '/api/v1/questionnaire')
            .headers({
                'Authorization': `Bearer ${itc.__raw}`
            })
    }
    const retrieveQuestionnaires = () => {
        if (!isAuthenticated) {
            return;
        }
        setQuestionnaireListState({status: API_STATUS.LOADING, body: locale.retrievingQuestionnaires});
        const errorCatcher = error => {
            setQuestionnaireListState({status: API_STATUS.ERROR, body: error.message()});
        };

        try {
            getAllQuestionnairesAsync()
                .then(response => {
                    if (response.error && response.error.message.includes("NetworkError")) {
                        setQuestionnaireListState({status: API_STATUS.ERROR, body: locale.serverCannotBeReached});
                        return;
                    }
                    if (response.error) {
                        setQuestionnaireListState({
                            status: API_STATUS.ERROR, body:
                                `${locale.noAdminError} (Error code: ${response.code})`
                        });
                        return;
                    }

                    setQuestionnaireListState({status: API_STATUS.IDLE, body: response.body});
                })
        } catch (error) {
            errorCatcher(error);
        }

    }

    const renderQuestionnaireList = () => {
        return <GridList cols={4} spacing={10}>
            {questionnaireListState.body.map(json =>
                <GridListTile key={json.key}>
                    <QuestionnaireCard
                        questionnaire={json}
                        setCurrentQuestionnaireKey={setCurrentQuestionnaireKey}
                    />
                </GridListTile>
            )}
        </GridList>
    }

    const questionnaireListStatusMessage = generateQuestionnaireListStatusMessage(questionnaireListState, loading);

    return questionnaireListStatusMessage === null ? renderQuestionnaireList() : questionnaireListStatusMessage;
};

