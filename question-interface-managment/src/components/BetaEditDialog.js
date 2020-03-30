import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Dialog,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import { SettingsContext } from "../contexts/SettingsContext";
import { NewQuestionContext } from "../contexts/NewQuestionContext";
import ToggleGridAreasButton from "./buttons/ToggleGridAreasButton";
import {
  AddButtonLabelProperty,
  ButtonTextProperty,
  ColorProperty, ContentProperty,
  DataMethodProperty, DefaultDateProperty,
  DefaultExpansionsProperty,
  DefaultTextValueProperty,
  DensityProperty,
  HeightProperty,
  HiddenProperty,
  HintProperty,
  HoursFromProperty,
  HoursLabelProperty,
  HoursStepProperty,
  HoursToProperty,
  ImageProperty, LabelOptionsProperty,
  LabelProperty, LinksToExpandableProperty, MaxDateProperty,
  MaxExpansionsProperty,
  MaxLengthProperty,
  MaxProperty, MinDateProperty,
  MinProperty,
  MinutesLabelProperty,
  OtherwiseLabelProperty,
  OtherwiseTooltipProperty,
  PatternProperty, PlaceholderProperty,
  RadiusProperty,
  RemoveButtonLabelProperty,
  RequiredProperty, SectionEndProperty, SectionStartProperty,
  ShowOtherwiseProperty, StepProperty, PrioritizedTextOptionsProperty,
  TextOptionsProperty,
  TitleProperty,
  TodayProperty,
  TooltipProperty,
  WidthProperty
} from "./QuestionnaireProperties";
import { v4 as uuidv4 } from 'uuid';
import {PROPERTIES_BY_QUESTION_TYPE, SPECIAL_CONVERSION_CASES} from "./QuestionTypes";

const EditDialog = ({ question, open, setOpen }) => {
  const { settings } = useContext(SettingsContext);
  const { dispatch } = useContext(QuestionnaireContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  // load question to editor state on dialog open
  useEffect(() => {
    newQuestionDispatch({ type: "SET_QUESTION", question: { ...question } });
  }, [open, newQuestionDispatch, question]);

  // dispatch action to questionnaireReducer to update question
  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: "UPDATE_QUESTION", id: question.id, new: newQuestion });
    console.table(question);
    setOpen(false);
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { title: "", options: [] }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {/* <ToggleGridAreasButton /> */}
      <form onSubmit={handleSubmit} style={{ padding: "1em" }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          style={{
            padding: "2em",
            background: settings.showGridAreas ? "lightgrey" : "transparent"
          }}
        >
          <DialogHeader question={question} />
          <DialogBody/>
          <DialogFooter handleClose={handleClose} />
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditDialog;

const DialogHeader = ({ question }) => {
  const { settings } = useContext(SettingsContext);
  const { questions } = useContext(QuestionnaireContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  const GridItem = (props) => (
    <Grid
      item
      xs={12}
      style={{
        textAlign: props.textAlign,
        background: settings.showGridAreas ? "lightblue" : "transparent",
        opacity: settings.showGridAreas ? 0.9 : 1.0
      }}
    >
      {props.children}
    </Grid>
  );

  const changeType = (newType) => {
    // handling special conversions
    if(newQuestion.type in SPECIAL_CONVERSION_CASES && newType in SPECIAL_CONVERSION_CASES[newQuestion.type]) {
      // array containing special conversions
      const specialConversions = SPECIAL_CONVERSION_CASES[newQuestion.type][newType];

      console.table(specialConversions);

      specialConversions.map((specialConversion) => {
        const property = specialConversion.property;
        const conversionFunction = specialConversion.conversionFunction;
        console.log(property);
        console.log(conversionFunction);
        newQuestion[property] =
          conversionFunction(newQuestion[property]);
      });
    }

    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion, type: newType }
    });
  };

  const TypeSelector = () => (
    <Select
    autoWidth
    labelId="type-select-label"
    value={newQuestion.type}
    onChange={e => changeType(e.target.value)}
    style={{ textAlign: "left" }}
  >
      {/*TODO: not everything is compatible for convert, so only show what's allowed.*/}
    <MenuItem value="radio">Radio</MenuItem>
    <MenuItem value="checkbox">Checkbox</MenuItem>
    <MenuItem value="range">Range</MenuItem>
    <MenuItem value="likert">Likert</MenuItem>

  </Select>
  );

  const QuestionTitle = () => (
    <Typography variant="h5">
      Edit Question {questions.indexOf(question) + 1}
    </Typography>
  );

  return (
    <GridItem textAlign="right">
      <FormControl>
        <InputLabel id="type-select-label">Type</InputLabel>
        <TypeSelector/>
      </FormControl>
      <Grid container direction="row" justify="center" alignItems="center">
        <GridItem textAlign="left">
          <QuestionTitle/>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

const DialogBody = () => {
  const { settings } = useContext(SettingsContext);
  const { newQuestion, newQuestionDispatch } = useContext(NewQuestionContext);

  const renderProperties = () => {
    const elements = [];
    PROPERTIES_BY_QUESTION_TYPE[newQuestion.type.toUpperCase()].map(property =>
      elements.push(React.createElement(property,
        {newQuestion: newQuestion, newQuestionDispatch: newQuestionDispatch})));
    return elements;
  };


  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
      <Grid
        item
        xs={12}
        style={{
          background: settings.showGridAreas ? "lightcoral" : "transparent",
          opacity: settings.showGridAreas ? 0.9 : 1.0
        }}
      >
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row">
          {renderProperties()}
        </Grid>
      </Grid>
    </Grid>
  );
};

const DialogFooter = ({ handleClose }) => {
  const { settings } = useContext(SettingsContext);

  const GridItem = (props) => (
    <Grid
    item
    xs
    style={{
      textAlign: "center",
      background: settings.showGridAreas ? "yellow" : "transparent",
      opacity: settings.showGridAreas ? 0.9 : 1.0
    }}
  >{props.children}</Grid>
  );


  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      justify="flex-end"
      style={{
        padding: "2em",
        background: settings.showGridAreas ? "lightgrey" : "transparent"
      }}
    >
      <GridItem>
        <Button variant="contained" color="secondary" onClick={handleClose}>cancel</Button>
      </GridItem>
      <GridItem>
        <Button variant="contained" color="primary" type="submit">submit</Button>
      </GridItem>
    </Grid>
  );
};
