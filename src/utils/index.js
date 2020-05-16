import React from "react";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import TuneIcon from "@material-ui/icons/Tune";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import Looks5TwoToneIcon from "@material-ui/icons/Looks5TwoTone";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import GestureIcon from "@material-ui/icons/Gesture";
import SelectIcon from "@material-ui/icons/ViewList";

import {HiddenProperty, SectionEndProperty, TodayProperty,} from "../components/properties/BooleanProperties";

import {DefaultDateProperty, MaxDateProperty, MinDateProperty,} from "../components/properties/DateProperties";

import {DefaultExpansionsProperty, MaxExpansionsProperty,} from "../components/properties/NumericProperties";

import {LabelOptionsProperty, TextOptionsProperty,} from "../components/properties/TextArrayProperties";

import {
    AddButtonLabelProperty,
    ButtonTextProperty,
    ColorProperty,
    ContentProperty,
    DefaultTextValueProperty,
    HintProperty,
    HoursLabelProperty,
    ImageProperty,
    LabelProperty,
    LinksToExpandableProperty,
    MinutesLabelProperty,
    PatternProperty,
    PlaceholderProperty,
    RemoveButtonLabelProperty,
    SectionStartProperty,
    TitleProperty,
    TooltipProperty,
} from "../components/properties/TextProperties";
import {
    CustomMinMaxStepProperty,
    HiddenRequiredComposite,
    HoursCompositeProperty,
    NumberTypeComposite,
    OtherwiseProperty,
    RadiusDensityComposite,
    WidthHeightComposite
} from "../components/properties/OtherProperties";



export const initial0 = {
    id: "v1",
    type: "radio",
    title: "untitled",
    // options: ["option 1", "option 2", "option 3", "option 4"],
    options: [],
};
export const initial1 = {
    section_start: "De hoofddoelen",
    hidden: false,
    id: "v1",
    type: "radio",
    required: true,
    title: "untitled",
    tooltip: "some tooltip",
    options: ["option 1", "option 2", "option 3"],
    show_otherwise: true,
    otherwise_label: "Nee, omdat:",
    otherwise_tooltip: "some tooltip",
    section_end: true,
};
export const initial2 = {
    section_start: "Capitals",
    hidden: false,
    id: "v1",
    type: "radio",
    required: true,
    title: "What is the capital city of the Netherlands?",
    tooltip: "Hint: It is not Berlin",
    options: ["Den Haag", "Amsterdam", "Berlin", "Groningen"],
    show_otherwise: true,
    otherwise_label: "Nee, omdat:",
    otherwise_tooltip: "some tooltip",
    section_end: true,
};
export const initial3 = [
    //   {id: 'v20', title: "Panda", type: "raw", content: '<p class="flow-text">Zie het voorbeeld hieronder:</p><img src="/images/begeleiders/omgeving.png" class="questionnaire-image" /><p class="flow-text">Geef voor de volgende antwoordopties aan of ze moeilijk of makkelijk te begrijpen waren.</p>'}
    {
        id: "v1",
        type: "range",
        title: "Hello BOI",
        labels: ["option 1", "option 222", "option 3", "option 4"],
    },
    {
        id: "v12",
        type: "radio",
        title: "Hello Kitty",
        options: ["option 1", "option 22", "option 3", "option 4"],
    },
    {
        id: "v2",
        type: "checkbox",
        title: "untitled checkbox",
        options: ["option 1", "option 2", "option 3", "option 4"],
    },
    {
        section_start: "De hoofddoelen",
        hidden: true,
        id: "v3",
        type: "range",
        min: 0,
        max: 200,
        step: 5,
        title: "Was het voor jou duidelijk ?",
        tooltip: "some tooltip",
        labels: ["helemaal niet duidelijk", "heel duidelijk"],

        // only since for debug rendering purposes, delete in final
        // options: ['helemaal niet duidelijk', 'heel duidelijk'],
        section_end: true,
    },
    {
        id: "v4",
        type: "likert",
        title: "untitled likert",
        options: [
            {title: "hobby/sport"},
            {title: "werk"},
            {title: "vriendschap"},
        ],
    },
    {
        id: "v5",
        type: "dropdown",
        title: "untitled dropdown",
        options: [
            {title: "hobby/sport", numeric_value: 0},
            {title: "werk", numeric_value: 25},
            {title: "vriendschap", numeric_value: 50},
        ],
    },

    {
        section_start: "Tot slot",
        hidden: true,
        id: "v6",
        type: "textarea",
        title:
            "Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?",
        tooltip: "some tooltip",
        placeholder: "Place holder",
        section_end: true,
    },

    {
        section_start: "De hoofddoelen",
        hidden: true,
        id: "v7",
        type: "range",
        min: 0,
        max: 200,
        step: 10,
        title: "Was het voor jou duidelijk ?",
        tooltip: "some tooltip",
        labels: ["helemaal niet duidelijk", "heel duidelijk"],

        // only since for debug rendering purposes, delete in final
        // options: ['helemaal niet duidelijk', 'heel duidelijk'],
        section_end: true,
    },

    {
        section_start: "Tot slot",
        hidden: true,
        id: "v8",
        type: "textfield",
        title:
            "Wat zou jij willen verbeteren aan de webapp die je de afgelopen drie weken hebt gebruikt?",
        tooltip: "some tooltip",
        default_value: "Niks",
        pattern: "[a-z]{1,10}",
        hint: "Must be a lowercase word between 1 and 10 characters in length",
        placeholder: "Place holder",
        section_end: true,
    },
    {
        id: "v9",
        type: "number",
        title: "untitled number",
        placeholder: 5132,
        min: 10,
        max: 100,
        maxlength: 4,
    },

    {
        id: "v10",
        type: "time",
        hours_from: 3,
        hours_to: 6,
        hours_step: 1,
        title:
            "Hoeveel tijd heb je deze week besteed aan de begeleiding van deze student movai pilon?",
    },
];

export const QUESTION_TYPES = [
    {type: "checkbox", disabled: false},
    {type: "radio", disabled: false},
    {type: "likert", disabled: false},
    {type: "range", disabled: false},
    {type: "raw", disabled: false},
    {type: "textarea", disabled: false},
    {type: "textfield", disabled: false},
    {type: "number", disabled: false},
    {type: "expandable", disabled: true},
    {type: "time", disabled: false},
    {type: "date", disabled: false},
    {type: "unsubscribe", disabled: true},
    {type: "dropdown", disabled: false},
    {type: "drawing", disabled: false},
];
export const TYPE_ICONS = {
    checkbox: <CheckBoxIcon/>,
    radio: <RadioButtonCheckedIcon/>,
    likert: <LinearScaleIcon/>,
    range: <TuneIcon/>,
    // raw: ,
    textarea: <TextFieldsIcon/>,
    textfield: <TextFormatIcon/>,
    number: <Looks5TwoToneIcon/>,
    // expandable: ,
    time: <ScheduleIcon/>,
    date: <DateRangeIcon/>,
    // unsubscribe: ,
    dropdown: <SelectIcon/>,
    drawing: <GestureIcon/>,
};

// converts "section_start" to "Section_start"
// converts "tooltip" to "Tooltip"
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// converts "section_start" to "Section start"
// converts "tooltip" to "Tooltip"
export function capitalize2(text) {
    return capitalize(text).replace("_", " ");
}

// chooses divider color for EditorButtonGroup depending on theme
export const DIVIDER_COLOR = (theme) =>
    theme.palette.type === "dark" ? "rgb(110, 110, 110)" : "rgb(196, 196, 196)";

export const CLEAN_QUESTION = {
    type: undefined,
    required: undefined,
    hidden: undefined,
    section_start: undefined,
    title: undefined,
    tooltip: undefined,
    options: [],
    show_otherwise: undefined,
    otherwise_label: undefined,
    otherwise_tooltip: undefined,
    section_end: undefined,
};

export const CLEAN_SUPER_QUESTION = {
    // date properties
    default_date: undefined,
    // min_date: undefined,
    // max_date: undefined,
    // boolean properties
    hidden: undefined,
    show_otherwise: undefined,
    required: undefined,
    today: undefined,
    section_end: undefined,
    // numeric properties
    min: undefined,
    max: undefined,
    step: undefined,
    max_length: undefined,
    default_expansions: undefined,
    max_expansions: undefined,
    hours_from: undefined,
    hours_to: undefined,
    hours_step: undefined,
    width: undefined,
    height: undefined,
    radius: undefined,
    density: undefined,
    // text properties
    title: undefined,
    tooltip: undefined,
    otherwise_label: undefined,
    otherwise_tooltip: undefined,
    raw: undefined,
    placeholder: undefined,
    default_value: undefined,
    hint: undefined,
    remove_button_label: undefined,
    add_button_label: undefined,
    hours_label: undefined,
    minutes_label: undefined,
    button_text: undefined,
    label: undefined,
    section_start: undefined,
    image: undefined,
    links_to_expandable: undefined,
    pattern: undefined,
    color: undefined,
    // text array properties
    options: [],
    labels: [],
};



export const CLEAN_SUPER_OPTION = {
    title: undefined,
    tooltip: undefined,
    stop_subscription: undefined,
    shows_questions: undefined,
    hides_questions: undefined,
    numeric_value: undefined,
};

// Question Preprocessing before edit
// handles defaults and undefineds
// converts an option from string to object
// after done, preprocessed question is given to state.question
const preprocessCheckbox = (question) => {
    // const preprocessedOptions = () => {
    //   return question.options;
    // };
    // prettier-ignore
    return {
        // ...CLEAN_SUPER_QUESTION,
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled checkbox",
        options: question.options !== undefined ? question.options : [],
        // optional
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        required: question.required !== undefined ? question.required : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        show_otherwise: question.show_otherwise !== undefined ? question.show_otherwise : undefined, // default (for all types) of show_otherwise: true?
        otherwise_label: question.otherwise_label !== undefined ? question.otherwise_label : undefined,
        otherwise_tooltip: question.otherwise_tooltip !== undefined ? question.otherwise_tooltip : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const preprocessMap = {
    checkbox: preprocessCheckbox,
    radio: preprocessCheckbox,
};

export const preprocessQuestion = (question) => {
    return preprocessMap[question.type](question);
};

export const PROPERTIES_BY_QUESTION_TYPE = {
    CHECKBOX: {
        requiredProperties: [TitleProperty, TextOptionsProperty],
        optionalProperties: [
            HiddenRequiredComposite,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            OtherwiseProperty,
        ],
    },

    RADIO: {
        requiredProperties: [TitleProperty, TextOptionsProperty],
        optionalProperties: [
            HiddenRequiredComposite,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            OtherwiseProperty,
        ],
    },

    LIKERT: {
        requiredProperties: [TitleProperty, TextOptionsProperty],
        optionalProperties: [
            HiddenProperty,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
        ],
    },

    RANGE: {
        requiredProperties: [TitleProperty, LabelOptionsProperty],
        optionalProperties: [
            HiddenProperty,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            CustomMinMaxStepProperty,
        ],
    },

    RAW: {
        requiredProperties: [ContentProperty],
        optionalProperties: [SectionStartProperty, SectionEndProperty],
    },

    TEXTAREA: {
        requiredProperties: [TitleProperty],
        optionalProperties: [
            HiddenProperty,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            PlaceholderProperty,
        ],
    },

    TEXTFIELD: {
        requiredProperties: [TitleProperty],
        optionalProperties: [
            HiddenProperty,
            SectionStartProperty,
            TooltipProperty,
            SectionEndProperty,
            PlaceholderProperty,
            DefaultTextValueProperty,
            PatternProperty,
            HintProperty,
        ],
    },

    NUMBER: {
        requiredProperties: [TitleProperty],
        optionalProperties: [
            HiddenRequiredComposite,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            NumberTypeComposite,
            PlaceholderProperty,
            LinksToExpandableProperty,
        ],
    },

    EXPANDABLE: {
        requiredProperties: [],
        optionalProperties: [
            SectionStartProperty,
            AddButtonLabelProperty,
            RemoveButtonLabelProperty,
            DefaultExpansionsProperty,
            MaxExpansionsProperty,
        ],
    },

    TIME: {
        requiredProperties: [TitleProperty],
        optionalProperties: [
            HoursCompositeProperty,
            HoursLabelProperty,
            MinutesLabelProperty,
        ],
    },

    DATE: {
        requiredProperties: [TitleProperty],
        optionalProperties: [
            HiddenRequiredComposite,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            MinDateProperty,
            MaxDateProperty,
            PlaceholderProperty,
            TodayProperty,
            DefaultDateProperty,
        ],
    },

    UNSUBSCRIBE: {
        requiredProperties: [],
        optionalProperties: [TitleProperty, ContentProperty, ButtonTextProperty],
    },

    DROPDOWN: {
        requiredProperties: [TitleProperty, TextOptionsProperty],
        optionalProperties: [
            HiddenProperty,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            LabelProperty,
        ],
    },

    DRAWING: {
        requiredProperties: [
            TitleProperty,
            WidthHeightComposite,
            ImageProperty,
            ColorProperty,
        ],
        optionalProperties: [
            HiddenProperty,
            SectionStartProperty,
            SectionEndProperty,
            TooltipProperty,
            RadiusDensityComposite,
        ],
    },
};

export const INITIAL_QUESTIONNAIRE_CONTEXT = [
    {id: 'v1', type: "range", title: "Hello BOI", labels: ["option 1", "option 2", "option 3", "option 4", "option5"]},
    {id: 'v2', type: "radio", title: "Hello Kitty", options: ["option 1", "option 2", "option 3", "option 4"]},
    // {id: 'v3', type: "checkbox", title: "untitled checkbox", options: ["option 1", "option 2", "option 3", "option 4"]},
    // {id: 'v4', type: "range", hidden: "true", title: "Hey Arnold", labels: ["passing rate"]},
    // {
    //     id: 'v5',
    //     type: "raw",
    //     content: "<p class=\"flow-text\">Hier staat een demo vragenlijst voor u klaar. Dit staat in een RAW tag</p>"
    // },
    // {
    //     id: "v26",
    //     type: "dropdown",
    //     title: "dropdown",
    //     label: "Hey",
    //     tooltip: "Bye",
    //     options: ["option 1", "option 2", "option 3", "option 4"]
    // },
    // {
    //     id: "v32",
    //     type: "radio",
    //     shows_otherwise: "false",
    //     title: "Voorbeeld van een radio",
    //     options: [{title: "Ja", shows_question: ["v2"]}, {title: "Nee", shows_question: ["v4"]}]
    // }
];

