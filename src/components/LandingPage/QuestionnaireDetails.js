import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {alignInGrid} from "./LandingPage";
import {API_STATUS} from "../../features/API/ApiHandler";
import CircularProgress from "@material-ui/core/CircularProgress";
import {auth_config} from "../../features/API/auth_config";
import {useAuth0} from "../react-auth0-spa";

const useStyles = makeStyles((theme) => ({
    card: {
        height: "100%"
    },
}));


export const QuestionnaireDetails = ({questionnaireKey}) => {
    const {getIdTokenClaims, isAuthenticated} = useAuth0();
    const [questionnaireState, setQuestionnaireState] = useState({status: API_STATUS.INIT, body: null});

    const questionnaireKeyHasChanged =
        () => questionnaireState.status === API_STATUS.IDLE && questionnaireState.body.key !== questionnaireKey;

    useEffect(() => {
        if(questionnaireKey == null || questionnaireState.status === API_STATUS.LOADING) return;
        if(questionnaireState.status === API_STATUS.INIT){
            retrieveQuestionnaire(questionnaireKey);
        }else if(questionnaireKeyHasChanged()){
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

    switch (questionnaireState.status){
        case API_STATUS.INIT:
            return <Wrapper
                title={"No questionnaire is selected."}
                subtitle={"Please click one of those listed on the left to view details."}
            />
        case API_STATUS.LOADING:
            return <Wrapper>
                <CircularProgress />
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
                extra={questionnaire.content.questions.length + " questions " + questionnaire.content.scores.length + " answers"}
                editAvailable
            />
    }

};

const Wrapper = ({title = "", subtitle = "", extra = "", editAvailable = false, ...props}) => {
    const classes = useStyles();
    return <Card className={classes.card}>
        <CardContent>
            {alignInGrid(1, <InfoIcon/>, <Typography color="textSecondary" gutterBottom>Questionnaire details
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
            <Button disabled={!editAvailable} color="primary">Edit Questionnaire</Button>
        </CardActions>
    </Card>
};