import React, { useContext, useEffect } from "react";
import {
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { NewQuestionContext } from "../contexts/NewQuestionContext";
import {
  PROPERTIES_BY_QUESTION_TYPE,
  SPECIAL_CONVERSION_CASES,
  CLEAN_SUPER_QUESTION,
  preprocessQuestion,
} from "../utils";
import Card from "@material-ui/core/Card";
import { IOptions as classes } from "glob";
import CardContent from "@material-ui/core/CardContent";
import { borderColor } from "@material-ui/system";
import { WidthProperty } from "./QuestionnaireProperties";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestion,
  resetAll,
  questionSlice,
} from "../features/questionProperties/questionSlice";
import { setQuestionAtIndex } from "../features/questions/questionsSlice";
import { useState } from "react";
import TypeProperty from "./properties/TypeProperty";
import { createElement } from "react";
import store from "../app/store";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { postprocessQuestion } from "./properties/postprocessor";

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
    zIndex: 1
  },
  stickyBot: {
    background: theme.palette.background.paper,
    position: "sticky",
    bottom: 0,
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


const EditDialog2 = ({ question, index, open, setOpen }) => {
  // const newQuestion = useSelector((state) => state.question);
  const dispatch2 = useDispatch();
  // const { dispatch } = useContext(QuestionnaireContext);

  const { dispatch } = useContext(QuestionnaireContext);

  // load question to editor state on dialog open
  useEffect(() => {
    dispatch2(setQuestion({ ...CLEAN_SUPER_QUESTION, ...question }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const state = store.getState();
    const newQuestion = postprocessQuestion(state.question);
    // const newQuestion = state.question;
    dispatch({ type: "UPDATE_QUESTION", id: question.id, new: newQuestion });
    // console.log(newQuestion);
    // setOpen(false);
  };

  // cancel all and return to QuestionsPage
  const handleClose = () => {
    // dispatch(resetAll());
    setOpen(false);
  };

  const classes = useStyles();

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
          <DialogHeader className={classes.header} index={index} />
          <Box p={2.5}>
            <DialogBody />
          </Box>
          <DialogFooter handleClose={handleClose} />
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditDialog2;

const DialogHeader = ({ index, ...props }) => {
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
          <Typography variant="h6" style={{ userSelect: "none" }}>{`Question ${index + 1}`}</Typography>
        </Grid>
        <Grid item>
          <TypeProperty />
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};



const DialogBody = () => {
  const type = useSelector((state) => state.question.type);
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Paper variant="outlined" className={classes.required}>
        <Typography variant="subtitle2" style={{ userSelect: "none" }}>Required</Typography>
        {PROPERTIES_BY_QUESTION_TYPE[type.toUpperCase()][
          "requiredProperties"
        ].map((el) => (
          <Box className={classes.mtb} p={0}>
            {createElement(el)}
          </Box>
        ))}
      </Paper>
      <Paper variant="outlined">
        <Typography variant="subtitle2" style={{ userSelect: "none" }}>Optional</Typography>
        {PROPERTIES_BY_QUESTION_TYPE[type.toUpperCase()][
          "optionalProperties"
        ].map((el) => (
          <Box className={classes.mtb} p={0}>
            {createElement(el)}
          </Box>
        ))}
      </Paper>
    </div>
  );
};

const DialogFooter = ({ handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.stickyBot}>
      <Divider />
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
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <Button
            disableElevation
            className={classes.button2}
            color="primary"
            type="submit"
          >
            save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
