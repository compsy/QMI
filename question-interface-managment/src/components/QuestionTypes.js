import React from 'react';
import {v4 as uuid} from "uuid";
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
import SelectIcon from '@material-ui/icons/ViewList';
import Crop54Icon from '@material-ui/icons/Crop54';
import {
  AddButtonLabelProperty,
  ButtonTextProperty,
  ColorProperty,
  ContentProperty,
  DefaultDateProperty,
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
  LabelOptionsProperty,
  LabelProperty,
  LinksToExpandableProperty,
  MaxDateProperty,
  MaxExpansionsProperty,
  MaxLengthProperty,
  MaxProperty,
  MinDateProperty,
  MinProperty,
  MinutesLabelProperty,
  OtherwiseProperty,
  PatternProperty,
  PlaceholderProperty,
  PrioritizedTextOptionsProperty,
  RadiusProperty,
  RemoveButtonLabelProperty,
  RequiredProperty,
  SectionEndProperty,
  SectionStartProperty,
  StepProperty,
  TextOptionsProperty,
  TitleProperty,
  TodayProperty,
  TooltipProperty,
  WidthProperty
} from "./QuestionnaireProperties";

export const QUESTION_TYPES = [
  {id: uuid(), label: "radio", icon: <RadioButtonCheckedIcon/>},
  {id: uuid(), label: "checkbox", icon: <CheckBoxIcon/>},
  {id: uuid(), label: "range", icon: <TuneIcon/>},
  {id: uuid(), label: "likert", icon: <LinearScaleIcon/>},
  {id: uuid(), label: "textarea", icon: <TextFieldsIcon/>},
  {id: uuid(), label: "number", icon: <Looks5TwoToneIcon/>},
  {id: uuid(), label: "date", icon: <DateRangeIcon/>},
  {id: uuid(), label: "time", icon: <ScheduleIcon/>},
  {id: uuid(), label: "textfield", icon: <TextFormatIcon/>},
  {id: uuid(), label: "draw", icon: <GestureIcon/>},
  // { id: uuid(), label: "raw" },
  // { id: uuid(), label: "expandable" },
  // { id: uuid(), label: "unsubscribed" },
  {id: uuid(), label: "dropdown", icon: <SelectIcon/>},
  {id: uuid(), label: "raw", icon: <Crop54Icon/>}
];


// todo: add ShowAfterProperty, this one is allowed for every type.
export const PROPERTIES_BY_QUESTION_TYPE = {
  CHECKBOX: {
    requiredProperties: [TitleProperty, TextOptionsProperty],
    optionalProperties: [RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty,
      TooltipProperty, OtherwiseProperty]
  },

  RADIO:{
    requiredProperties: [TitleProperty, TextOptionsProperty],
    optionalProperties: [ RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty,
      TooltipProperty,OtherwiseProperty]
  },

  LIKERT: {
    requiredProperties: [TitleProperty, PrioritizedTextOptionsProperty],
    optionalProperties:[HiddenProperty, SectionStartProperty, SectionEndProperty,
      TooltipProperty]
  },

  RANGE: {
    requiredProperties: [TitleProperty, LabelOptionsProperty],
    optionalProperties: [HiddenProperty, SectionStartProperty, SectionEndProperty,
      TooltipProperty, MinProperty, MaxProperty, StepProperty]
  },


  RAW: {
    requiredProperties: [ContentProperty],
    optionalProperties: [SectionStartProperty, SectionEndProperty]
  },


  TEXTAREA:{
    requiredProperties: [TitleProperty],
    optionalProperties: [HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty, PlaceholderProperty]
  },

  TEXTFIELD: {
    requiredProperties: [TitleProperty],
    optionalProperties:  [HiddenProperty, SectionStartProperty, TooltipProperty, SectionEndProperty, PlaceholderProperty,
      DefaultTextValueProperty, PatternProperty, HintProperty]
  },

  NUMBER: {
    requiredProperties: [TitleProperty],
    optionalProperties: [RequiredProperty, HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty,
      MinProperty, MaxProperty, PlaceholderProperty, MaxLengthProperty, LinksToExpandableProperty]
  },

  EXPANDABLE: {
    requiredProperties: [],
    optionalProperties:  [SectionStartProperty, AddButtonLabelProperty, RemoveButtonLabelProperty, DefaultExpansionsProperty,
      MaxExpansionsProperty]
  },

  TIME:{
    requiredProperties: [TitleProperty],
    optionalProperties:  [HoursFromProperty, HoursToProperty, HoursStepProperty, HoursLabelProperty, MinutesLabelProperty]
  },

  DATE: {
    requiredProperties: [TitleProperty],
    optionalProperties: [RequiredProperty, HiddenProperty , SectionStartProperty, SectionEndProperty, TooltipProperty,
      MinDateProperty, MaxDateProperty, PlaceholderProperty, TodayProperty, DefaultDateProperty]
  },


  UNSUBSCRIBE: {
    requiredProperties: [],
    optionalProperties: [TitleProperty, ContentProperty, ButtonTextProperty]
  },

  DROPDOWN: {
    requiredProperties: [TitleProperty, PrioritizedTextOptionsProperty],
    optionalProperties: [HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty,
      LabelProperty],
  },


  DRAWING: {
    requiredProperties: [TitleProperty, WidthProperty, HeightProperty, ImageProperty, ColorProperty],
    optionalProperties: [HiddenProperty, SectionStartProperty, SectionEndProperty, TooltipProperty,
      RadiusProperty, DensityProperty]
  },

};



/*
* Because of the slight difference in storing options between radio/checkboxes and likert/dropdown, a conversion
* needs to be done. This function adds a numeric_value (index by default) to the elements of a given textOptions.
*
* parameter: textOptions: an array of strings
* returns: an array of JSON containing the converted options.
* */
export function TextOptionsToPrioritizedTextOptions(textOptions){
  return textOptions.map((option, index) => ({title: option, numeric_value: index}));
}
/*
* The opposite to the function above. This converts a JSON array of prioritized text to a simple string array
* containing the titles of those (previously) prioritized options.
* */
export function PrioritizedTextOptionsToTextOptions(prioritizedTextOptions){
  return prioritizedTextOptions.map((json) => json.title);
}

/*
* A map containing special conversion cases.
* As explained in TextOptionsToPrioritizedTextOptions, some properties in question types share the same name
* but are differently defined per type. This map stores those exception as follows:
*
* - Identified by the current type (uppercase)
* - JSON containing each type that, if the current type will be converted to this, has special conversion cases.
* - specialConversions: an array holding the actual conversion data:
*     - property: the property to be converted
*     - conversionFunction: the function that handles the special conversion.
* */

const TEXT_OPTION_TO_PRIORITIZED_CASE =  {
  likert: [{property: 'options', conversionFunction: TextOptionsToPrioritizedTextOptions}],
  dropdown: [{property: 'options', conversionFunction: TextOptionsToPrioritizedTextOptions}],
};

const PRIORITIZED_TO_TEXT_OPTION_CASE =  {
  radio: [{property: 'options', conversionFunction: PrioritizedTextOptionsToTextOptions}],
  checkbox: [{property: 'options', conversionFunction: PrioritizedTextOptionsToTextOptions}],
};

export const SPECIAL_CONVERSION_CASES = {
  radio: TEXT_OPTION_TO_PRIORITIZED_CASE,
  checkbox: TEXT_OPTION_TO_PRIORITIZED_CASE,
  likert: PRIORITIZED_TO_TEXT_OPTION_CASE,
  dropdown: PRIORITIZED_TO_TEXT_OPTION_CASE

  // todo: add special case: min/max for numeric and date
};

