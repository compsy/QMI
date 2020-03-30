import React from 'react';
import { v4 as uuid } from "uuid";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import TuneIcon from '@material-ui/icons/Tune';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import Looks5TwoToneIcon from '@material-ui/icons/Looks5TwoTone';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import GestureIcon from '@material-ui/icons/Gesture';
import {
  AddButtonLabelProperty, ButtonTextProperty,
  ColorProperty,
  ContentProperty, DataMethodProperty, DefaultDateProperty,
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
  ImageProperty,
  LabelOptionsProperty, LabelProperty,
  LinksToExpandableProperty, MaxDateProperty,
  MaxExpansionsProperty,
  MaxLengthProperty,
  MaxProperty, MinDateProperty,
  MinProperty, MinutesLabelProperty,
  OtherwiseLabelProperty,
  OtherwiseProperty,
  OtherwiseTooltipProperty,
  PatternProperty,
  PlaceholderProperty,
  RadiusProperty,
  RemoveButtonLabelProperty,
  RequiredProperty,
  SectionEndProperty,
  SectionStartProperty,
  ShowOtherwiseProperty,
  StepProperty,
  TextOptionsPriorityProperty,
  TextOptionsProperty,
  TitleProperty, TodayProperty,
  TooltipProperty,
  WidthProperty
} from "./QuestionnaireProperties";
import {Grid, Tooltip} from "@material-ui/core";

export const QUESTION_TYPES = [
  { id: uuid(), label: "radio", icon: <RadioButtonCheckedIcon /> },
  { id: uuid(), label: "checkbox", icon: <CheckBoxIcon />  },
  { id: uuid(), label: "range", icon: <TuneIcon /> },
  { id: uuid(), label: "likert", icon: <LinearScaleIcon /> },
  { id: uuid(), label: "textarea", icon: <TextFieldsIcon /> },
  { id: uuid(), label: "number", icon: <Looks5TwoToneIcon /> },
  { id: uuid(), label: "date",  icon: <DateRangeIcon /> },
  { id: uuid(), label: "time", icon: <ScheduleIcon /> },
  { id: uuid(), label: "textfield", icon: <TextFormatIcon /> },
  { id: uuid(), label: "draw", icon: <GestureIcon /> }
  // { id: uuid(), label: "raw" },
  // { id: uuid(), label: "expandable" },
  // { id: uuid(), label: "unsubscribed" },
  // { id: uuid(), label: "dropdown" },
];

// todo: add ShowAfterProperty, this one is allowed for every type.
export const PROPERTIES_BY_QUESTION_TYPE = {
  CHECKBOX: [RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty,
              TooltipProperty, TextOptionsProperty, OtherwiseProperty],
  RADIO: [RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty,
    TooltipProperty, TextOptionsProperty, OtherwiseProperty],
  LIKERT: [HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty,
    TooltipProperty, TextOptionsPriorityProperty],
  RANGE: [HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty,
    TooltipProperty, MinProperty, MaxProperty, StepProperty, TextOptionsProperty, LabelOptionsProperty],
  RAW: [SectionStartProperty, SectionEndProperty, ContentProperty],
  TEXTAREA: [HiddenProperty, TitleProperty, SectionStartProperty, TooltipProperty, SectionEndProperty, PlaceholderProperty],
  TEXTFIELD: [HiddenProperty, SectionStartProperty, TitleProperty, TooltipProperty, SectionEndProperty, PlaceholderProperty,
    DefaultTextValueProperty, PatternProperty, HintProperty],
  NUMBER: [RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty, TooltipProperty,
  MinProperty, MaxProperty, PlaceholderProperty, MaxLengthProperty, LinksToExpandableProperty],
  EXPANDABLE: [SectionStartProperty, RemoveButtonLabelProperty, AddButtonLabelProperty, DefaultExpansionsProperty,
  MaxExpansionsProperty],
  TIME: [TitleProperty, HoursFromProperty, HoursToProperty, HoursStepProperty, HoursLabelProperty, MinutesLabelProperty],
  DATE: [RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty, TooltipProperty,
  MinDateProperty, MaxDateProperty, PlaceholderProperty, DefaultDateProperty],
  UNSUBSCRIBE: [TitleProperty, ContentProperty, ButtonTextProperty],
  DROPDOWN: [HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty, TooltipProperty, TextOptionsPriorityProperty,
  LabelProperty],
  DRAWING: [HiddenProperty, SectionStartProperty, SectionEndProperty, TitleProperty, TooltipProperty, WidthProperty, HeightProperty,
  ImageProperty, ColorProperty, RadiusProperty, DensityProperty]
};
/*
const MiscProperties = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Misc.</h3>
      <p><i>These items are available in <b>multiple</b> other question types.</i></p>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <RequiredProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    <ShowOtherwiseProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    {newQuestion.show_otherwise ?
      <Grid item xs style={{ textAlign: "center", margin: "1em 0" }}>
        <OtherwiseLabelProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
        <OtherwiseTooltipProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
      </Grid>
      : null}
    <HiddenProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    <Grid item xs style={{ textAlign: "center", margin: "1em 0" }}>
      <TooltipProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    </Grid>

    <MinProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    <MaxProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />

    {}
    <ContentProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    <PlaceholderProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    <SectionStartProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
    <SectionEndProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch} />
  </CustomGrid>
};
const DrawingSpecificVariables = () => {
  const DrawingGrid = (props) =>
    <Grid item xs={4}>
      <h3>Drawing-specific.</h3>
      {props.children}
    </Grid>;

  return <DrawingGrid>
    <WidthProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <HeightProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <ImageProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <ColorProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <RadiusProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <DensityProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </DrawingGrid>
}
const TextFieldSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Textfield-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <DefaultTextValueProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <PatternProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <HintProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
const NumberSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Number-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <MaxLengthProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <LinksToExpandableProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
const RangeSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Range-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <StepProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <LabelOptionsProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
const ExpandableSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Expandable-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <AddButtonLabelProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <RemoveButtonLabelProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <DefaultExpansionsProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <MaxExpansionsProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
const TimeSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Time-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <HoursFromProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <HoursToProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <HoursStepProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <HoursLabelProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <MinutesLabelProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
const DateSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Date-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <TodayProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <DefaultDateProperty disabled={newQuestion.today} newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <MinDateProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <MaxDateProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>

  </CustomGrid>
};
const UnsubscribeSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Unsubscribe-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <ButtonTextProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
    <DataMethodProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
const DropdownSpecificVariables = () => {
  const CustomGrid = (props) =>
    <Grid item xs={4}>
      <h3>Dropdown-specific.</h3>
      {props.children}
    </Grid>;
  return <CustomGrid>
    <LabelProperty newQuestion={newQuestion} newQuestionDispatch={newQuestionDispatch}/>
  </CustomGrid>
};
*/
