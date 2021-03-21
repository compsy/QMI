import React from 'react'

import { HiddenProperty, SectionEndProperty, TodayProperty } from '../components/Atoms/Properties/BooleanProperties'

import { DefaultDateProperty, MaxDateProperty, MinDateProperty } from '../components/Atoms/Properties/DateProperties'

import { DefaultExpansionsProperty, MaxExpansionsProperty } from '../components/Atoms/Properties/NumericProperties'

import { LabelOptionsProperty, TextOptionsProperty } from '../components/Atoms/Properties/TextArrayProperties'

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
} from '../components/Atoms/Properties/TextProperties'
import {
    CustomMinMaxStepProperty,
    HiddenRequiredComposite,
    HoursCompositeProperty,
    NumberTypeComposite,
    OtherwiseProperty,
    RadiusDensityComposite,
    WidthHeightComposite,
} from '../components/Atoms/Properties/OtherProperties'
import { v4 as uuidv4 } from 'uuid'
import processQuestionnaire from './ProcessQuestionnaire'

export const QUESTION_TYPES = [
    { type: 'checkbox', disabled: false },
    { type: 'radio', disabled: false },
    { type: 'likert', disabled: false },
    { type: 'range', disabled: false },
    { type: 'raw', disabled: false },
    { type: 'textarea', disabled: false },
    { type: 'textfield', disabled: false },
    { type: 'number', disabled: false },
    { type: 'expandable', disabled: true },
    { type: 'time', disabled: false },
    { type: 'date', disabled: false },
    { type: 'unsubscribe', disabled: true },
    { type: 'dropdown', disabled: false },
    { type: 'drawing', disabled: false },
]

// converts "section_start" to "Section_start"
// converts "tooltip" to "Tooltip"
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

// converts "section_start" to "Section start"
// converts "tooltip" to "Tooltip"
export function capitalize2(text) {
    return capitalize(text).replace('_', ' ')
}


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
}

export const CLEAN_SUPER_OPTION = {
    title: undefined,
    tooltip: undefined,
    stop_subscription: undefined,
    shows_questions: undefined,
    hides_questions: undefined,
    numeric_value: undefined,
}

// QuestionsList Preprocessing before edit
// handles defaults and undefineds
// converts an option from string to object
// after done, preprocessed question is given to state.question
const preprocessCheckbox = (question) => {
    return {
        // ...CLEAN_SUPER_QUESTION,
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : 'untitled checkbox',
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
    }
}



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
}

export const GENERATE_INITIAL_QUESTIONNAIRE_METADATA_CONTEXT = () => {
    return {
        key: uuidv4().replace(/-/g, '_'),
        name: 'Questionnaire ' + uuidv4(),
        title: 'Untitled Questionnaire',
    }
}


export const INITIAL_QUESTIONNAIRE_CONTEXT = [
    {
        id: 'v1',
        type: 'raw',
        content: '<h4>Welcome to your new questionnaire!</h4>\n' +
            '<p class="flow-text" style=\'font-size:medium;\'>Add questions by dragging a question type over here.</p>\n' +
            '<p class="flow-text" style=\'font-size:medium;\'>Double click a question title to edit the title.</p>\n' +
            '<p class="flow-textext" style=\'font-size:medium;\'>Click a question header to show details.</p>\n' +
            '<p class="flow-textext" style=\'font-size:medium;\'>Click render questionnaire to see the final output</p>\n',
    },

]


export const toPrint = () => {
    const store = require('../store')
    const questions = store.default.getState().questions
    return processQuestionnaire(questions)
}
