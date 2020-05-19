import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InfoIcon from "@material-ui/icons/Info";
import {Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {alignInGrid} from "./QuestionnaireView";

export const QuestionnaireDetails = ({current}) => {
    if (current === 0) {
        return <Wrapper
            title={"No questionnaire is selected."}
            subtitle={"Please click one of those listed on the left to view details."}
            extra={""}
        />
    }
    return <Wrapper
        title={"Questionnaire " + current}
        subtitle={"x questions"}
        extra={"This has not yet been configured."}
        editAvailable
    />
};

const Wrapper = ({title, subtitle, extra, editAvailable = false}) => {
    return <Card className={classes.card}>
        <CardContent>
            {alignInGrid(1, <InfoIcon/>, <Typography color="textSecondary" gutterBottom>Questionnaire
                details</Typography>)}
            <Typography variant="h5" component="h2">
                {title}
            </Typography>
            <Typography color="textSecondary">
                {subtitle}
            </Typography>
            <Typography variant="body2" component="p">
                {extra}
            </Typography>
        </CardContent>
        <CardActions>
            <Button disabled={!editAvailable} color="primary">Edit Questionnaire</Button>
        </CardActions>
    </Card>
};