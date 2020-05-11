import React, {useState} from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import NewQuestionContextProvider from "../../contexts/NewQuestionContext";
import EditDialog2 from "../BetaEditDialog2";
import store from "../../app/store";
import { SET_SAVED } from "../../features/utilities/utilitiesSlice";


const EditQuestionButton = ({question, index}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="edit">
                <IconButton onClick={() => {
                    store.dispatch(SET_SAVED(store.getState().utilities));
                    console.log("state.utilities.saved: ", store.getState().utilities.saved)
                    setOpen(true);
                }}>
                    <EditIcon/>
                </IconButton>
            </Tooltip>
            <NewQuestionContextProvider>
                {/* <BetaEditDialog question={question} open={open} setOpen={setOpen} /> */}
                {open && <EditDialog2 question={question} index={index} open={open} setOpen={setOpen}/>}
            </NewQuestionContextProvider>
        </>
    );
};

export default EditQuestionButton;
