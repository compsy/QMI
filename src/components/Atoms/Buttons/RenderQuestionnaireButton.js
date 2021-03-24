import { toPrint } from '../../../utils'
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
                // let x = JSON.stringify(toPrint())
                // x = Buffer.from(x).toString("base64");
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    Authorization: 'Bearer my-token',
                    body: {
                        'name': '',
                        'content': JSON.stringify(toPrint()),
                        'key': '',
                        'title': '',
                    },
                };
                fetch('http://app.u-can-act.nl/basic_auth_api/questionnaires', options)
                    .then(response => response.json())
                    .then(data => {
                        window.open(data.url);
                    })
            }}
        >Render</Button>
    );
}