import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {alignInGrid} from "./HomePage";
import {API_STATUS} from "../../features/API/ApiHandler";
import CircularProgress from "@material-ui/core/CircularProgress";
import {auth_config} from "../../features/API/auth_config";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import {SET_QUESTIONS} from "../../features/questions/questionsSlice";
import {v4 as uuid} from "uuid";

import {useDispatch} from "react-redux";
import {SET_METADATA} from "../../features/questionnaire/questionnaireMetadataSlice";


const useStyles = makeStyles((theme) => ({
    card: {
        height: "100%"
    },
}));

const LOCALE_EN = {
    noQuestionnaireTitle: "No questionnaire is selected.",
    noQuestionnaireSubtitle: "Please click one of the questionnaires listed on the left to view details.",
    editQuestionnaireButtonText: "Edit Questionnaire",
    questionnaireDetailsTitle: "Questionnaire Details",
    questions: "questions",
    answers: "answers"
}

export const QuestionnaireDetails = ({questionnaireKey}) => {
    const locale = LOCALE_EN;
    const {getIdTokenClaims, isAuthenticated} = useAuth0();
    const [questionnaireState, setQuestionnaireState] = useState({status: API_STATUS.INIT, body: null});
    const dispatch = useDispatch();

    const loadQuestionnaireIntoState = () => {
        localStorage.clear();
        const questionnaire = questionnaireState.body;
        questionnaire.content.questions.forEach(question => question.type === 'raw' ? question.id = uuid() : null);
        dispatch(SET_QUESTIONS({questions: questionnaire.content.questions}));
        dispatch(SET_METADATA({
            metadata: {
                key: questionnaire.key,
                name: questionnaire.name,
                title: questionnaire.title
            }
        }));
    }

    useEffect(() => {
        if (questionnaireKey == null || questionnaireState.status === API_STATUS.LOADING) return;
        if (questionnaireState.status === API_STATUS.INIT) {
            retrieveQuestionnaire(questionnaireKey);
        }
    })

    const getQuestionnaireByKeyAsync = async (key) => {
        const itc = await getIdTokenClaims();
        const unirest = require('unirest');
        return unirest('GET', auth_config.base + '/api/v1/questionnaire/' + key)
            .headers({
                'Authorization': `Bearer ${itc.__raw}`
            })
    }
    const retrieveQuestionnaire = (key) => {
        if (!isAuthenticated || questionnaireState.status === API_STATUS.LOADING) return;
        setQuestionnaireState({status: API_STATUS.LOADING, body: null})
        getQuestionnaireByKeyAsync(key)
            .catch(error => setQuestionnaireState({status: API_STATUS.ERROR, body: error}))
            .then(response => {
                if (response.status >= 400) {
                    setQuestionnaireState({status: API_STATUS.ERROR, body: response.body});
                }
                setQuestionnaireState({status: API_STATUS.IDLE, body: response.body});
            })
            .catch(error => setQuestionnaireState({status: API_STATUS.ERROR, body: error}));
    }

    switch (questionnaireState.status) {
        case API_STATUS.INIT:
            return <Wrapper
                title={locale.noQuestionnaireTitle}
                subtitle={locale.noQuestionnaireSubtitle}
            />
        case API_STATUS.LOADING:
            return <Wrapper>
                <CircularProgress/>
            </Wrapper>
        case API_STATUS.ERROR:
            return <Wrapper
                title={"An error has occurred"}
                subtitle={questionnaireState.body}
            />
        case API_STATUS.IDLE:
            const questionnaire = questionnaireState.body;
            console.log(questionnaire);
            return <Wrapper
                title={questionnaire.name}
                subtitle={"key: " + questionnaire.key}
                extra={
                    `${questionnaire.content.questions.length} ${locale.questions} | ${questionnaire.content.scores.length} ${locale.answers}.`}
                editAvailable
                onClick={loadQuestionnaireIntoState}
            > </Wrapper>
    }

};

const Wrapper = ({title = "", subtitle = "", extra = "", editAvailable = false, ...props}, loadQuestionnaireFunction = null) => {
    const classes = useStyles();
    const locale = LOCALE_EN;

    return <Card className={classes.card}>
        <CardContent>
            {alignInGrid(1, <InfoIcon/>, <Typography color="textSecondary" gutterBottom>
                {locale.questionnaireDetailsTitle}
            </Typography>)}
            <Typography variant="h5" component="h2">
                {title}
            </Typography>
            <Typography color="textSecondary">
                {subtitle}
            </Typography>
            <Typography variant="body2" component="p">
                {extra}
            </Typography>
            {props.children}
        </CardContent>
        <CardActions>
            <Button disabled={!editAvailable} color="primary" component={Link} to="/" {...props}>Edit
                Questionnaire</Button>
        </CardActions>
    </Card>

};

