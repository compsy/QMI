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
    {id: uuid(), label: "drawing", icon: <GestureIcon/>},
    // { id: uuid(), label: "unsubscribed" },
    {id: uuid(), label: "dropdown", icon: <SelectIcon/>},
    {id: uuid(), label: "raw", icon: <Crop54Icon/>}
];
