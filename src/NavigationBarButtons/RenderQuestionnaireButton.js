import {toPrint} from "../utils";
import Button from "@material-ui/core/Button";
import React from "react";

export function RenderQuestionnaireButton() {
    return (
        <Button
            color="inherit"
            id={"renderQuestionnaire"}
            onClick={() => {
                let x = JSON.stringify(toPrint());
                x = Buffer.from(x).toString("base64");
                window.open("http://app.u-can-act.nl/questionnaire/interactive?content=" + x);
            }}
        >
            Render Questionnaire
        </Button>
    );
}