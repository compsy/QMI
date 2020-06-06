import { toPrint } from '../utils'
import ImageIcon from '@material-ui/icons/Image'
import Button from '@material-ui/core/Button'
import React from 'react'

export function RenderQuestionnaireButton() {
    return (
        <Button
            color="inherit"
            data-cy={'renderQuestionnaire'}
            id={'renderQuestionnaire'}
            startIcon={<ImageIcon/>}
            onClick={() => {
                let x = JSON.stringify(toPrint())
                x = Buffer.from(x).toString("base64");
                window.open("http://app.u-can-act.nl/questionnaire/interactive?content=" + x);
            }}
        >Render</Button>
    );
}