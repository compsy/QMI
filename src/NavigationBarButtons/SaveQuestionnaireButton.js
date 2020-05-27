import Button from "@material-ui/core/Button";
import React from "react";
import {SafeQuestionnaireDialog} from "../components/SaveQuestionnaireDialog";

export function SaveQuestionnaireButton() {
    const [saveQuestionnaireOpen, setSafeQuestionnaireOpen] = React.useState(false);
    return (
        <div>
            <Button
                color="inherit"
                id={"saveQuestionnaire"}
                onClick={() => {
                    setSafeQuestionnaireOpen(true)
                }}
            >
                Save Questionnaire
            </Button>
            <SafeQuestionnaireDialog open={saveQuestionnaireOpen} setOpen={setSafeQuestionnaireOpen}/>
        </div>
    );
}