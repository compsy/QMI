import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {alignInGrid} from "../../utils/formatting_utils";

const LOCALE_EN = {
    noQuestionnaireTitle: 'No questionnaire is selected.',
    noQuestionnaireSubtitle: "Please click one of the questionnaires listed on the left to view details.",
    editQuestionnaireButtonText: "Edit Questionnaire",
    questions: "questions",
    answers: "answers"
}

const useStyles = makeStyles(() => ({
    card: {
        height: '100%',
    },
}))

export const QuestionnaireDetailsCard = ({title = "", subtitle = "", extra = "", editAvailable = false, ...props}) => {
    const classes = useStyles();

    return <Card className={classes.card}>
        <CardContent>
            {alignInGrid(1, <InfoIcon/>, <Typography color="textSecondary" gutterBottom>
                {"Questionnaire Details"}
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
            <Button disabled={!editAvailable} color="primary" component={Link} to="/" {...props}>Edit Questionnaire</Button>
        </CardActions>
    </Card>

};

/* Basic implementations of QuestionnaireDetailsCard*/
export const QuestionnaireDetailsNoQuestionnaireCard = () =>{
    return <QuestionnaireDetailsCard
        title={LOCALE_EN.noQuestionnaireTitle}
        subtitle={LOCALE_EN.noQuestionnaireSubtitle}
    />
}
export const QuestionnaireDetailsLoadingCard = () =>{
    return <QuestionnaireDetailsCard>
        <CircularProgress />
    </QuestionnaireDetailsCard>
}
export const QuestionnaireDetailsErrorCard = ({message}) =>{
    return <QuestionnaireDetailsCard
        title={"An error has occurred"}
        subtitle={message}
    />
}
