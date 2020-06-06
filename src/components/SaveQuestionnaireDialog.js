import {Box, Button, Dialog, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {useAuth0} from "./react-auth0-spa";
import {useDispatch, useSelector} from "react-redux";
import {API_STATUS} from "../features/API/ApiHandler";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import {SET_METADATA} from "../features/questionnaire/questionnaireMetadataSlice";
import {GENERATE_INITIAL_QUESTIONNAIRE_METADATA_CONTEXT} from "../utils";

export const useStyles = makeStyles((theme) => ({
    body: {
        padding: theme.spacing(2),
        "&>*": {
            padding: theme.spacing(4),
        },
    },
    button1: {
        height: "60px",
        width: "100%",
        borderRadius: 0,
    },
    button2: {
        height: "60px",
        width: "100%",
        borderRadius: 0,
    },
    stickyTop: {
        background: theme.palette.background.paper,
        position: "sticky",
        top: 0,
        zIndex: 2,
    },
    stickyBot: {
        background: theme.palette.background.paper,
        position: "sticky",
        bottom: 0,
        zIndex: 2,
    },
    mtb: {
        marginTop: theme.spacing(2),
    },
    header: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    required: {
        marginBottom: theme.spacing(4)
    },
    headerGrid: {
        padding: theme.spacing(2),
    }
}));


const DialogHeader = ({state, ...props}) => {
    const classes = useStyles();

    return (
        <div className={classes.stickyTop}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                {...props}
            >
                <Grid item>
                    <Typography variant="h6" style={{userSelect: "none"}}>Save questionnaire</Typography>
                </Grid>
                {state.status === API_STATUS.LOADING ?
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                    : null
                }
            </Grid>
            <Divider/>
        </div>
    );
};


export const SafeQuestionnaireDialog = ({open, setOpen}) => {
    const classes = useStyles();
    const metadata = useSelector(stateTwo => stateTwo.questionnaireMetadata);
    const [name, setName] = useState(metadata.name);
    const [title, setTitle] = useState(metadata.title);
    const [key, setKey] = useState(metadata.key);
    const {isAuthenticated} = useAuth0();
    const [state, setState] = useState({status: API_STATUS.INIT, body: null});
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        resetStates();

    }
    const resetStates = () => {
        dispatch(SET_METADATA({metadata: GENERATE_INITIAL_QUESTIONNAIRE_METADATA_CONTEXT()}));
        setState({status: API_STATUS.INIT, body: null});
    }

    const callCreateQuestionnaire = async () => {
        if (!isAuthenticated) {
            setState({status: API_STATUS.NOT_AUTHENTICATED, body: null});
        }
        setState({status: API_STATUS.LOADING, body: null});
    }
    const errorInAttribute = (attributeName) => state.status === API_STATUS.ERROR && state.body.hasOwnProperty(attributeName);

    const handleSubmit = (e) => {
        e.preventDefault();
        callCreateQuestionnaire();
    }

    const generateTextField = (attributeName, attributeSetter, attributeState) => {
        return <TextField fullWidth id="filled-basic" label={attributeName} variant="filled"
                          required
                          error={errorInAttribute(attributeName)}
                          helperText={errorInAttribute(attributeName) ? state.body[attributeName] : null}
                          defaultValue={attributeState}
                          onChange={(
                              e) => {
                              attributeSetter(e.target.value)
                          }}
        />
    }

    const generateStatusFeedback = () => {
        if (state.status === API_STATUS.ERROR && state.body.hasOwnProperty('special'))
            return <Alert severity="error">{state.body.special}</Alert>

        if (state.status === API_STATUS.IDLE)
            return <Alert severity="success">Your questionnaire has been saved!</Alert>;
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <form onSubmit={e => handleSubmit(e)}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <DialogHeader className={classes.header} state={state}/>
                    <Box p={2.5}>
                        {generateTextField('name', setName, name)}
                        {generateTextField('key', setKey, key)}
                        {generateTextField('title', setTitle, title)}
                        {generateStatusFeedback()}
                    </Box>
                    <DialogFooter handleClose={handleClose} state={state} isAuthenticated={isAuthenticated}/>
                </Grid>
            </form>
        </Dialog>
    );
}


const DialogFooter = ({handleClose, isAuthenticated}) => {
    const classes = useStyles();

    return (
        <div className={classes.stickyBot}>
            <Divider/>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs>
                    <Button
                        disableElevation
                        className={classes.button1}
                        color="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs>
                    <Button
                        disableElevation
                        className={classes.button2}
                        color="primary"
                        type="submit"
                        disabled={!isAuthenticated}
                    >
                        {isAuthenticated ? 'Save' : 'Please login to save your data'}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
