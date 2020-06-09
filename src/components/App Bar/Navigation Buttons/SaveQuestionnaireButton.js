import Button from '@material-ui/core/Button'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import { SafeQuestionnaireDialog } from '../../Home Page/SaveQuestionnaireDialog'

export function SaveQuestionnaireButton() {
    const [saveQuestionnaireOpen, setSafeQuestionnaireOpen] = React.useState(false)
    return (
        <div>
            <Button
                color="inherit"
                id={'saveQuestionnaire'}
                startIcon={<SaveIcon/>}
                onClick={() => {
                    setSafeQuestionnaireOpen(true)
                }}
            >Save
            </Button>
            <SafeQuestionnaireDialog open={saveQuestionnaireOpen} setOpen={setSafeQuestionnaireOpen}/>
        </div>
    );
}