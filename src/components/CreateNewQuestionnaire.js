import {Box, Dialog, Grid} from "@material-ui/core";
import React, {useState} from "react";

export const CreateNewQuestionnaireDialog = () =>{
    const [open, setOpen] = useState(true);
    const handleClose = (event) =>{
        setOpen(false);
    }
    const handleSubmit = () => {

    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <form onSubmit={handleSubmit}>
                {/* <form style={{ padding: "1em" }}> */}
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                </Grid>
            </form>
        </Dialog>
    );
}