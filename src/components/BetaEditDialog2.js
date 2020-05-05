import React, {createElement, useContext, useEffect} from "react";
import {Box, Button, Dialog, Divider, Grid, makeStyles, Paper, Typography,} from "@material-ui/core";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import {CLEAN_SUPER_QUESTION, PROPERTIES_BY_QUESTION_TYPE,} from "../utils";
import {useDispatch, useSelector} from "react-redux";
import {setQuestion,} from "../features/question/questionSlice";
import TypeProperty from "./properties/TypeProperty";
import store from "../app/store";
import {postprocessQuestion} from "./properties/postprocessor";
import { UPDATE_QUESTION } from "../features/questions/questionsSlice";

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

const EditDialog2 = ({ question, index, open, setOpen }) => {
  const dispatch = useDispatch();

  // load question to editor state on dialog open
  useEffect(() => {
    dispatch(setQuestion({ ...CLEAN_SUPER_QUESTION, ...question }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const state = store.getState();
    const newQuestion = postprocessQuestion(state.question);
    dispatch(UPDATE_QUESTION({ id: question.id, new: newQuestion }))
  };

  // cancel all and return to QuestionsPage
  const handleClose = () => {
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

  const PropertyGroup = ({title, propertyGroupName}) => {
    return <Paper variant="outlined" className={classes[title.toLowerCase()]}>
      <Typography variant="subtitle2" style={{ userSelect: "none" }}>{title}</Typography>
      {PROPERTIES_BY_QUESTION_TYPE[type.toUpperCase()][
        propertyGroupName
        ].map((property) => (
        <Box key={property.name} className={classes.mtb} p={0}>
          {createElement(property)}
        </Box>
      ))}
    </Paper>
  }

  return (
    <div className={classes.body}>
      <PropertyGroup title="Required" propertyGroupName="requiredProperties"/>
      <PropertyGroup title="Optional" propertyGroupName="optionalProperties"/>
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
