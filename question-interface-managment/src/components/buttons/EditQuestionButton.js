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

const EditQuestionButton = ({ question }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="edit">
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <EditDialog question={question} open={open} setOpen={setOpen} />
    </>
  );
};

export default EditQuestionButton;

const EditDialog = ({ question, open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [optionAdded, setOptionAdded] = useState(false);
  const { questions, dispatch } = useContext(QuestionnaireContext);

  // load question to editor state on dialog open
  useEffect(() => {
    setTitle(question.title);
    setOptions([...question.options]);
  }, [open, question.options, question.title]);

  // dispatch action to questionnaireReducer to update question
  const handleSubmit = event => {
    event.preventDefault();
    const newQuestion = { ...question, title: title, options: options };
    dispatch({ type: "UPDATE_QUESTION", id: question.id, new: newQuestion });
    setOpen(false);
    setTitle("");
  };

  // update correct option on text input changes
  const handleChange = (index, event) => {
    let newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOptionClick = event => {
    setOptions([...options, ""]);
    setOptionAdded(true);
  };

  const handleRemoveOptionClick = (index, event) => {
    let newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
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
            value={title}
            onChange={e => setTitle(e.target.value)}
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
          {options.map((option, index) => (
            <TextField
              autoFocus={
                optionAdded
                  ? index === options.length - 1
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
