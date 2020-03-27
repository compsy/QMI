import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Tooltip,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
  Grid,
  Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import NewQuestionContextProvider, {
  NewQuestionContext
} from "../../contexts/NewQuestionContext";

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

const EditDialog = ({ question, open, setOpen }) => {
  const [optionAdded, setOptionAdded] = useState(false);
  const { questions, dispatch } = useContext(QuestionnaireContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  // load question to editor state on dialog open
  useEffect(() => {
    newQuestionDispatch({ type: "SET_QUESTION", question: question });
  }, [open, newQuestionDispatch, question]);

  // dispatch action to questionnaireReducer to update question
  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: "UPDATE_QUESTION", id: question.id, new: newQuestion });
    setOpen(false);
    newQuestionDispatch({ type: "SET_QUESTION", question: {} });
  };

  // update correct option on text input changes
  const handleChange = (index, event) => {
    let newOptions = [...newQuestion.options];
    newOptions[index] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: newOptions }
    });
  };

  const handleAddOptionClick = event => {
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: [...newQuestion.options, ""] }
    });
    setOptionAdded(true);
  };

  const handleRemoveOptionClick = (index, event) => {
    let newOptions = [...newQuestion.options];
    newOptions.splice(index, 1);
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, options: newOptions }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setOptionAdded(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit} style={{ padding: "1em" }}>
        <DialogTitle>
          Edit Question {questions.indexOf(question) + 1}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            variant="outlined"
            autoComplete="off"
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newQuestion.title}
            onChange={e =>
              newQuestionDispatch({
                type: "SET_QUESTION",
                question: { ...newQuestion, title: e.target.value }
              })
            }
          />
          <Grid container style={{ margin: "1em 0" }}>
            <Grid item xs={6}>
              <Box style={{ textAlign: "left" }}>
                <Typography variant="h6">Options</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box style={{ textAlign: "right" }}>
                <Button onClick={handleAddOptionClick}>add option</Button>
              </Box>
            </Grid>
          </Grid>
          {newQuestion.options.map((option, index) => (
            <TextField
              autoFocus={
                optionAdded
                  ? index === newQuestion.options.length - 1
                    ? true
                    : false
                  : false
              }
              style={{ margin: "0.2em 0" }}
              placeholder="option"
              type="text"
              fullWidth
              value={option}
              onChange={e => handleChange(index, e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={e => handleRemoveOptionClick(index, e)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
