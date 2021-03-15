import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {API_STATUS} from "../../features/API/ApiHandler";
import React from "react";
import {LOCALE_EN as locale} from "../Molecules/QuestionnaireList";

/*
* generates a status mesasge according to the current state
* */
export const generateQuestionnaireListStatusMessage = (questionnaireListState, loggingIn) => {
    const status = questionnaireListState.status;
    const body = questionnaireListState.body;

    if (loggingIn) {
        return <InfoLoadingStatusMessage message={locale.loggingIn}/>
    }

    switch (status) {
        case API_STATUS.LOADING:
            return <InfoLoadingStatusMessage message={questionnaireListState.body}/>
        case API_STATUS.ERROR:
            return <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {questionnaireListState.body}
            </Alert>
        case API_STATUS.INIT:
        case API_STATUS.NOT_AUTHENTICATED:
            return <NotAuthenticatedStatusMessage/>
        case API_STATUS.IDLE:
            return body === [] ? <NoQuestionnairesStatusMessage/>: null;
    }
}


/*
* actual status messages
* */
const NoQuestionnairesStatusMessage = () => {
    return <Alert severity="info">
        <AlertTitle>{locale.noQuestionnaires}</AlertTitle>
    </Alert>
}
const NotAuthenticatedStatusMessage = () => {
    return <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Please log in.
    </Alert>
}
const InfoLoadingStatusMessage = ({message}) => {
    return <Alert severity="info">
        <AlertTitle>Info </AlertTitle>
        <Grid container spacing={3}>
            <Grid item><CircularProgress size={20}/></Grid>
            <Grid item>{message}</Grid>
        </Grid>
    </Alert>

}