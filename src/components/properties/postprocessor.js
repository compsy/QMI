const postprocessCheckbox = (question) => {
    // const preprocessedOptions = () => {
    //   return question.options;
    // };

    const processedOptionsCheckbox = () => {
        return question.options.map((q) =>
            typeof q === "string"
                ? q
                : {
                    ...q,
                    numeric_value: undefined,
                    id: undefined,
                }
        );
    };
    // prettier-ignore
    return {
        // ...CLEAN_SUPER_QUESTION,
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled checkbox",
        options: question.options !== undefined ? question.type === "checkbox" ? processedOptionsCheckbox() : question.options : [],
        // optional
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        required: question.required !== undefined ? question.required : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
        show_otherwise: question.show_otherwise !== undefined ? question.show_otherwise : undefined,
        otherwise_label: question.otherwise_label !== undefined ? question.otherwise_label : undefined,
        otherwise_tooltip: question.otherwise_tooltip !== undefined ? question.otherwise_tooltip : undefined,
    };
};

const postprocessRange = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled range",
        labels: question.labels !== undefined ? question.labels : [],
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        min: question.min !== undefined ? question.min : undefined,
        max: question.max !== undefined ? question.max : undefined,
        step: question.step !== undefined ? question.step : undefined,
        required: question.required !== undefined ? question.required : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    }
};

const postprocessLikert = (question) => {
    const processedOptionsLikert = () => {
        return question.options.map((q) =>
            typeof q === "string"
                ? q
                : {
                    ...q,
                    tooltip: undefined,
                    stop_subscription: undefined,
                    shows_questions: undefined,
                    hides_questions: undefined,
                    id: undefined,
                }
        );
    };
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled likert",
        options: question.options !== undefined ? processedOptionsLikert() : [],
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessRaw = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        content: question.content !== undefined ? question.content : "no raw content",
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    }
};

const postprocessTextarea = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled textarea",
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        placeholder: question.placeholder !== undefined ? question.placeholder : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessTextfield = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled textfield",
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        default_value: question.default_value !== undefined ? question.default_value : undefined,
        pattern: question.pattern !== undefined ? question.pattern : undefined,
        hint: question.hint !== undefined ? question.hint : undefined,
        placeholder: question.placeholder !== undefined ? question.placeholder : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessNumber = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled number",
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        maxlength: question.maxlength !== undefined ? question.maxlength : undefined,
        placeholder: question.placeholder !== undefined ? question.placeholder : undefined,
        links_to_expandable: question.links_to_expandable !== undefined ? question.links_to_expandable : undefined,
        min: question.min !== undefined ? question.min : undefined,
        max: question.max !== undefined ? question.max : undefined,
        required: question.required !== undefined ? question.required : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessTime = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled number",
        // optional
        hours_from: question.hours_from !== undefined ? question.hours_from : undefined,
        hours_to: question.hours_to !== undefined ? question.hours_to : undefined,
        hours_step: question.hours_step !== undefined ? question.hours_step : undefined,
        hours_label: question.hours_label !== undefined ? question.hours_label : undefined,
        minutes_label: question.minutes_label !== undefined ? question.minutes_label : undefined,
    };
};

const postprocessDate = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled number",
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        today: question.today !== undefined ? question.today : undefined,
        required: question.required !== undefined ? question.required : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        placeholder: question.placeholder !== undefined ? question.placeholder : undefined,
        min: question.min !== undefined ? question.min : undefined,
        max: question.max !== undefined ? question.max : undefined,
        default_date: question.default_date !== undefined ? question.default_date : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessDropdown = (question) => {
    const processedOptionsDropdown = () => {
        return question.options.map((q) =>
            typeof q === "string"
                ? q
                : {
                    ...q,
                    tooltip: undefined,
                    stop_subscription: undefined,
                    shows_questions: undefined,
                    hides_questions: undefined,
                    id: undefined,
                }
        );
    };
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled dropdown",
        options: question.options !== undefined ? processedOptionsDropdown() : [],
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        label: question.label !== undefined ? question.label : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessDrawing = (question) => {
    // prettier-ignore
    return {
        id: question.id,
        type: question.type,
        // required
        title: question.title !== undefined ? question.title : "untitled drawing",
        width: question.width !== undefined ? question.width : 0,
        height: question.height !== undefined ? question.height : 0,
        image: question.image !== undefined ? question.image : "",
        color: question.color !== undefined ? question.color : "#000000",
        // optional
        section_start: question.section_start !== undefined ? question.section_start : undefined,
        hidden: question.hidden !== undefined ? question.hidden : undefined,
        tooltip: question.tooltip !== undefined ? question.tooltip : undefined,
        radius: question.radius !== undefined ? question.radius : undefined,
        density: question.density !== undefined ? question.density : undefined,
        section_end: question.section_end !== undefined ? question.section_end : undefined,
    };
};

const postprocessMap = {
    checkbox: postprocessCheckbox,
    radio: postprocessCheckbox,
    range: postprocessRange,
    likert: postprocessLikert,
    raw: postprocessRaw,
    textarea: postprocessTextarea,
    textfield: postprocessTextfield,
    number: postprocessNumber,
    time: postprocessTime,
    date: postprocessDate,
    dropdown: postprocessDropdown,
    drawing: postprocessDrawing,
};

export const postprocessQuestion = (question) => {
    return postprocessMap[question.type](question);
};
