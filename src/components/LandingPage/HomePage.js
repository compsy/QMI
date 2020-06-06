import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {QuestionnaireDetails} from "./QuestionnaireDetails";
import {QuestionnaireList} from "./QuestionnaireList";

export const HomePage = () => {

    const [currentQuestionnaireKey, setCurrentQuestionnaireKey] = useState(null);
    return <Grid data-cy="landingPage" container spacing={10} style={{padding: 100}}>
        <Grid item xs={8}>
            <QuestionnaireList setCurrentQuestionnaireKey={setCurrentQuestionnaireKey}/>
        </Grid>
        <Grid item xs={4}>
            <QuestionnaireDetails questionnaireKey={currentQuestionnaireKey}/>
        </Grid>
    </Grid>
};


export const alignInGrid = (spacing, ...renderedComponents) => {
    return <Grid container direction="row" alignItems="center" spacing={spacing}>
        {renderedComponents.map((component, index) => (
            <Grid key={index} item>
                {component}
            </Grid>))}
    </Grid>
};

