import Button from '@material-ui/core/Button'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { SafeQuestionnaireDialog } from '../../Home Page/SaveQuestionnaireDialog'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { SET_UTILITIES } from '../../../features/utilities/utilitiesSlice'
import { REMOVE_ALL } from '../../../features/questions/questionsSlice'
import { useDispatch } from 'react-redux'


export function EraseQuestionnaireButton() {
    const dispatch = useDispatch()


    const [open, setOpen] = React.useState(false)
    const [saveQuestionnaireOpen, setSafeQuestionnaireOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button color="inherit" data-cy={"eraseQuestionnaire"} id={"eraseQuestionnaire"} onClick={handleClickOpen}
                    startIcon={<DeleteIcon/>}
            >
                Erase</Button>

            <div>
                <SafeQuestionnaireDialog open={saveQuestionnaireOpen} setOpen={setSafeQuestionnaireOpen}/>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Do you want to erase questionnaire?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The questionnaire will be deleted without restoration.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button id={"noToDelete"} onClick={handleClose} color="primary">
                            No
                        </Button>
                        <Button id={"yesToDelete"} onClick={() => {
                            setOpen(false);
                            dispatch(SET_UTILITIES({showsMap: {}, hidesMap: {}, saved: {}}));
                            dispatch(REMOVE_ALL());
                        }} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
}
