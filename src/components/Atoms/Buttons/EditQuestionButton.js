import React, {useState} from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EditDialog2 from "../../EditingFeature";
import store from "../../../store";
import {SET_SAVED} from "../../../features/State Management/utilitiesSlice";


const EditQuestionButton = ({question, index}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="edit">
                <IconButton data-cy={"edit" + (index + 1)} onClick={() => {
                    store.dispatch(SET_SAVED(store.getState().utilities));
                    console.log("state.utilities.saved: ", store.getState().utilities.saved)
                    setOpen(true);
                }}>
                    <EditIcon/>
                </IconButton>
            </Tooltip>
            {open && <EditDialog2 question={question} index={index} open={open} setOpen={setOpen}/>}
        </>
    );
};

export default EditQuestionButton;
