import ImageIcon from '@material-ui/icons/Image'
import Button from '@material-ui/core/Button'
import React from 'react'
import SubmitQuestionnaireDialog from '../../Molecules/SubmitQuestionnaireDialog'

export function SubmitQuestionnaireButton() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Button
                color="inherit"
                data-cy={'renderQuestionnaire'}
                id={'renderQuestionnaire'}
                startIcon={<ImageIcon/>}
                onClick={handleClickOpen}
            >Submit</Button>
            <SubmitQuestionnaireDialog open={open} onClose={handleClose}/>
        </div>
    );
}