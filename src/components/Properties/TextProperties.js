import React from "react";
import {TextProperty} from "./TextTemplate";

// Text Properties
export const TitleProperty = ({...props}) => {
    return (
        <div data-cy={"title"}>
            <TextProperty
                propertyName={"title"}
                name={"Title"}
                required={true}
                placeholder={"Enter title text here.."}
                {...props}
            />
        </div>
    );
};

export const TooltipProperty = ({...props}) => {
    return (
        <TextProperty propertyName={"tooltip"} name={"Tooltip text"} {...props} />
    );
};

export const OtherwiseLabelProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"otherwise_label"}
            name={"Custom 'otherwise: ...' text"}
            {...props}
        />
    );
};

export const OtherwiseTooltipProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"otherwise_tooltip"}
            name={"'otherwise: ...' tooltip"}
            {...props}
        />
    );
};

export const ContentProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"content"}
            name={"Raw HTML"}
            multiline
            required={true}
            {...props}
        />
    );
};

export const PlaceholderProperty = ({...props}) => {
    return (
        <div data-cy={"placeholder"}>
            <TextProperty
                propertyName={"placeholder"}
                name={"Placeholder"}
                {...props}
            />
        </div>
    );
};

export const DefaultTextValueProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"default_value"}
            name={"Default value"}
            {...props}
        />
    );
};

export const HintProperty = ({...props}) => {
    return <TextProperty propertyName={"hint"} name={"Hint"} {...props} />;
};

export const RemoveButtonLabelProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"remove_button_label"}
            name={"Remove-button label"}
            {...props}
        />
    );
};

export const AddButtonLabelProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"add_button_label"}
            name={"Add-button label"}
            {...props}
        />
    );
};

export const HoursLabelProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"hours_label"}
            name={"Custom 'hours' text"}
            {...props}
        />
    );
};

export const MinutesLabelProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"minutes_label"}
            name={"Custom 'minutes' label"}
            {...props}
        />
    );
};

export const ButtonTextProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"button_text"}
            name={"Button text"}
            {...props}
        />
    );
};

export const LabelProperty = ({...props}) => {
    return (
        <div data-cy={"label"}>
            <TextProperty propertyName={"label"} name={"Label"} {...props} />
        </div>
    );
};

export const SectionStartProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"section_start"}
            name={"Start section with..."}
            {...props}
        />
    );
};

export const ImageProperty = ({...props}) => {
    return (
        <div data-cy={"image"}>
            <TextProperty
                propertyName={"image"}
                name={"Image URL"}
                required={true}
                {...props}
            />
        </div>
    );
};

export const LinksToExpandableProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"links_to_expandable"}
            name={"ID of expandable using input"}
            {...props}
        />
    );
};

export const PatternProperty = ({...props}) => {
    return (
        <TextProperty propertyName={"pattern"} name={"Regex pattern"} {...props} />
    );
};

export const ColorProperty = ({...props}) => {
    return (
        <TextProperty
            propertyName={"color"}
            name={"Color"}
            type="color"
            {...props}
        />
    );
};
