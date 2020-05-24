import {API_STATUS} from "../../features/API/ApiHandler";
import GridList from "@material-ui/core/GridList";
import {makeStyles, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import React, {useEffect, useState} from "react";
import {auth_config} from "../../features/API/auth_config";
import {useAuth0} from "../react-auth0-spa";

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 500,

    },
    title: {
        fontSize: 14,
    },
    subtitle: {
        fontSize: 10,
    },
}));

export const QuestionnaireList = ({setCurrentQuestionnaireKey}) => {
    const classes = useStyles();
    const {isAuthenticated, getIdTokenClaims} = useAuth0();
    const [questionnaireListState, setQuestionnaireListState] = useState({status: API_STATUS.INIT, body: []});
    useEffect(() => {
        if(questionnaireListState.status === API_STATUS.INIT){
            retrieveQuestionnaires();
        }
    });
    console.log(questionnaireListState);
    const getAllQuestionnairesAsync = async () => {
        const itc = await getIdTokenClaims();
        const unirest = require('unirest');
        return unirest('GET', auth_config.base + '/api/v1/questionnaire')
            .headers({
                'Authorization': `Bearer ${itc.__raw}`
            })
    }
    const retrieveQuestionnaires = () => {
        if(!isAuthenticated) return;
        setQuestionnaireListState({status: API_STATUS.LOADING, body: []});
        const errorCatcher = error => {
            console.log("error");
            setQuestionnaireListState({status: API_STATUS.ERROR, body: error.body});
        };

        try{
            getAllQuestionnairesAsync()
                .then(response => {
                    if(response.error){
                        setQuestionnaireListState({status: API_STATUS.ERROR, body: response});
                    }
                    setQuestionnaireListState({status: API_STATUS.IDLE, body: response.body});
                })
        }catch(error){
            errorCatcher(error);
        }

    }
    const renderStatusMessage = (status) =>{
        switch (status){
            case API_STATUS.LOADING:
                return <CircularProgress color="secondary"/>
            case API_STATUS.error:
                return getTypographyMessage("Error." +  questionnaireListState.body)
            case API_STATUS.NOT_AUTHENTICATED:
                return getTypographyMessage("Please log in.");
            case API_STATUS.IDLE:
                return renderQuestionnaires();
        }
    }
    const renderQuestionnaires = () =>{
        return questionnaireListState.body.map(json => <GridListTile key={json.key} className={classes.tile}>
                <QuestionnaireCard questionnaire={json}/>
            </GridListTile>
        );
    }
    const getTypographyMessage = (message) => {
        return<GridListTile key={"message"} className={classes.tile}>
            <MessageCard>{message}</MessageCard>
        </GridListTile>
    }

    const MessageCard = ({props}) => {
        return<Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} variant="h3">{props.children}</Typography>
            </CardContent>
        </Card>
    }

    const QuestionnaireCard = ({questionnaire}) => {
        return <Card className={classes.card}>
            <CardActionArea type="button" onClick={() => setCurrentQuestionnaireKey(questionnaire.key)}>
                <CardContent>
                    <Typography className={classes.title} variant="h3">{questionnaire.title}</Typography>
                    <Typography className={classes.subtitle} variant="subtitle1">{questionnaire.key}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton onClick={() => setCurrentQuestionnaireKey(questionnaire.key)}><InfoIcon/></IconButton>
                <IconButton
                    onClick={() => {console.log("Load questionnaire data into state, redirect to editor");}}>
                    <EditIcon/>
                </IconButton>
            </CardActions>
        </Card>
    }

    return <GridList cols={4} spacing={10}>
        {
            questionnaireListState.status === API_STATUS.IDLE && questionnaireListState.body === [] ?
                getTypographyMessage("No questionnaires available.")
            :
            renderStatusMessage(questionnaireListState.status)}
    </GridList>
};

