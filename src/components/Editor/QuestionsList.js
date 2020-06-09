import React, {useState} from "react";
import {Divider, ExpansionPanel, ExpansionPanelDetails, Grid, Typography,} from "@material-ui/core";
import RemoveQuestionButton from "./Question Buttons/RemoveQuestionButton";
import EditQuestionButton from "./Question Buttons/EditQuestionButton";
import RadioCheckboxTypePreview from "./Question Previews/RadioCheckboxTypePreview";
import LikertTypePreview from "./Question Previews/LikertTypePreview";
import RangeTypePreview from "./Question Previews/RangeTypePreview";
import DropdownTypePreview from "./Question Previews/DropdownTypePreview";
import NumberTypePreview from "./Question Previews/NumberTypePreview";
import DatePickerTypePreview from "./Question Previews/DatePickerTypePreview";
import TimePickerPreview from "./Question Previews/TimePickerTypePreview";
import TextAreaTypePreview from "./Question Previews/TextAreaTypePreview";
import TextFieldTypePreview from "./Question Previews/TextFieldTypePreview";
import DrawingTypePreview from "./Question Previews/DrawingTypePreview";
import {Draggable} from "react-beautiful-dnd";
import "../index.css";
import RawPreview from "./Question Previews/RawTypePreview";
import DuplicateQuestionButton from "./Question Buttons/DuplicateQuestionButton";
import {ExpansionRule} from './ExpansionRule'
import UnsupportedQuestionTypePreview from "./Question Previews/UnsupportedQuestionTypePreview";

const QuestionsList = ({index, question, ...props}) => {
    const [open, setOpen] = useState(false);

    return (
        <Draggable key={question.id} draggableId={question.id} index={index}>
            {(provided) => (
                <div
                    id={question.title}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                >
                    <ExpansionPanel expanded={open} {...props}>
                        <ExpansionRule
                            onClick={() => {
                                if (question.type !== "raw") {
                                    setOpen(!open)
                                }
                            }}
                            question={question}
                            provided={provided}
                        />
                        <Divider/>
                        <Details question={question} index={index}/>
                    </ExpansionPanel>
                </div>
            )}
        </Draggable>
    );
};

const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default QuestionsList;

const renderQuestionDetails = (question, index) => {
    switch (question.type) {
        case "radio":
        case "checkbox":
            return <RadioCheckboxTypePreview question={question} index={index}/>;
        case "likert":
            return <LikertTypePreview question={question} index={index}/>;
        case "range":
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <RangeTypePreview question={question} index={index}/>
                </div>
            );
        case "dropdown":
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <DropdownTypePreview question={question}/>
                </div>
            );
        case "textarea":
            return (
                <div style={style}>
                    <TextAreaTypePreview question={question}/>
                </div>
            );
        case "number":
            return <NumberTypePreview question={question}/>;
        case "date":
            return <DatePickerTypePreview question={question}/>;
        case "time":
            return <TimePickerPreview question={question}/>;
        case "textfield":
            return <TextFieldTypePreview question={question}/>;
        case "drawing":
            return (
                <div style={style}>
                    <DrawingTypePreview question={question}/>
                </div>
            );
        case "raw":
            return <RawPreview question={question}/>;
        default:
            return <UnsupportedQuestionTypePreview/>;
    }
}

const renderEditButtons = (question, index) => {
    if (question.type !== "raw") {
        return (
            <div>
                <RemoveQuestionButton question={question} index={index}/>
                <EditQuestionButton question={question} index={index}/>
                <DuplicateQuestionButton question={question} index={index}/>
            </div>
        );
    }
}

const Details = ({question, index}) => {

    return (
        <ExpansionPanelDetails>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={1}
            >
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                    }}
                >
                    <Typography variant="caption">
                        {question.type.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                    }}
                >
                    {renderQuestionDetails(question, index)}
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                    }}
                >
                    {renderEditButtons(question, index)}
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    );
};
