import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const TextAreaTypePreview = ({question}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    section_start={question.section_start}
                    hidden={question.hidden}
                    id={question.id}
                    type={question.type}
                    title={question.title}
                    tooltip={question.tooltip}
                    placeholder={question.placeholder}
                    section_end={question.section_end}
                />

            </div>
        </form>
    );
};

export default TextAreaTypePreview
