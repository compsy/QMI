import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";

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


export const QuestionnaireCard = ({questionnaire, setCurrentQuestionnaireKey}) => {
    const classes = useStyles();
    return <Paper elevation={4}><Card className={classes.card}>
        <CardActionArea type="button" onClick={() => setCurrentQuestionnaireKey(questionnaire.key)}>
            <CardContent>
                <Typography className={classes.title} variant="h3">{questionnaire.title}</Typography>
                <Typography className={classes.subtitle} variant="subtitle1">{questionnaire.key}</Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <IconButton onClick={() => setCurrentQuestionnaireKey(questionnaire.key)}><InfoIcon/></IconButton>
        </CardActions>
    </Card></Paper>
}