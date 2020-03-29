import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const TextFieldPreview = ({question}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                section_start = {question.section_start}
                hidden = {question.hidden}
                id = {question.id}
                type={ question.type}
                title={question.title}
                tooltip={question.tooltip}
                default_value={question.default_value}
                pattern={question.pattern}
                hint={question.hint}
                placeholder={question.placeholder}
                section_end={question.section_end}
            />
        </form>
    );
}

export default TextFieldPreview
