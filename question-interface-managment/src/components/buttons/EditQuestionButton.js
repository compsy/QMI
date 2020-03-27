import React, { useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import NewQuestionContextProvider from "../../contexts/NewQuestionContext";
import EditDialog from "../BetaEditDialog";

const EditQuestionButton = ({ question }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="edit">
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <NewQuestionContextProvider>
        <EditDialog question={question} open={open} setOpen={setOpen} />
      </NewQuestionContextProvider>
    </>
  );
};

export default EditQuestionButton;
