import ImageIcon from '@material-ui/icons/Image'
import Button from '@material-ui/core/Button'
import React from 'react'
import RenderQuestionnaireDialog from '../../Molecules/RenderQuestionnaireDialog'

export function RenderQuestionnaireButton() {

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
            >Render</Button>
            <RenderQuestionnaireDialog open={open} onClose={handleClose}/>
        </div>
    );
}