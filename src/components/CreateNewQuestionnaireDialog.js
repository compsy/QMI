import {Box, Button, Dialog, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {v4 as uuidv4} from "uuid";

const useStyles = makeStyles((theme) => ({
    body: {
        padding: theme.spacing(2),
        "&>*": {
            // marginTop: theme.spacing(4),
            // marginBottom: theme.spacing(4),
            padding: theme.spacing(4),
        },
    },
    button1: {
        // background: fade(theme.palette.secondary.main, 0.1),
        height: "60px",
        width: "100%",
        borderRadius: 0,
    },
    button2: {
        // background: fade(theme.palette.primary.main, 0.1),
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
        // marginBottom: theme.spacing(2),
    },
    header: {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        // paddingRight: theme.spacing(4),
    },
    required: {
        marginBottom: theme.spacing(4)
    },
    headerGrid: {
        padding: theme.spacing(2),
    }
}));

export const CreateNewQuestionnaireDialog = ({open, setOpen}) =>{
    const [name, setName] = useState("Untitled Questionnaire");
    const classes = useStyles();

    const handleClose = () =>{
        setOpen(false);
    }

    const handleSubmit = () => {
        const key = uuidv4();
        const content = {};
        const emptyQuestionnaire = {
            name: name,
            content: content,
            key: key,
            title: name
        }
        localStorage.clear();
        window.location.reload(true)
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    <DialogHeader className={classes.header} />
                    <Box p={2.5}>
                        <TextField fullWidth id="filled-basic" label="Name" variant="filled" onChange={(
                            e) => {setName(e.target.value)}}
                        />
                    </Box>
                    <DialogFooter handleClose={handleClose}/>
                </Grid>


            </form>
        </Dialog>
    );
}

const DialogHeader = ({...props}) => {
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
                    <Typography variant="h6" style={{userSelect: "none"}}>Create new questionnaire</Typography>
                </Grid>
            </Grid>
            <Divider/>
        </div>
    );
};


const DialogFooter = ({handleClose}) => {
    const classes = useStyles();

    return (
        <div className={classes.stickyBot}>
            <Divider/>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs>
                    <Button
                        disableElevation
                        className={classes.button1}
                        // variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        cancel
                    </Button>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs>
                    <Button
                        disableElevation
                        className={classes.button2}
                        color="primary"
                        type="submit"
                    >
                        create
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
