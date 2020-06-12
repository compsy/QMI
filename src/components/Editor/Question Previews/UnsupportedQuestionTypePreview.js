import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))

const UnsupportedQuestionTypePreview = () => {
    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <Typography variant="h4">Unsupported question type.</Typography>
                <Typography variant="subtitle1">This question cannot be rendered nor edited, but will not be deleted
                    from your questionnaire.</Typography>
            </div>
        </form>
    );
};

export default UnsupportedQuestionTypePreview
