import React, {useState} from "react";
import {Divider, ExpansionPanel, ExpansionPanelDetails, Grid, Typography,} from "@material-ui/core";
import RemoveQuestionButton from "./buttons/RemoveQuestionButton";
import EditQuestionButton from "./buttons/EditQuestionButton";
import RadioCheckboxPreview from "./previews/RadioCheckboxPreview";
import LikertPreview from "./previews/LikertPreview";
import RangePreview from "./previews/RangePreview";
import DropdownPreview from "./previews/DropdownPreview";
import NumberPreview from "./previews/NumberPreview";
import DatePickerPreview from "./previews/DatePickerPreview";
import TimePickerPreview from "./previews/TimePickerPreview";
import TextArea from "./previews/TextArea";
import TextFieldPreview from "./previews/TextFieldPreview";
import DrawingPreview from "./previews/DrawingPreview";
import {Draggable} from "react-beautiful-dnd";
import "./index.css";
import RawPreview from "./previews/RawPreview";
import DuplicateQuestionButton from "./buttons/DuplicateQuestionButton";
import {Summary} from './Summary'

const Question = ({index, question, ...props}) => {
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
                        <Summary
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

export default Question;

const renderQuestionDetails = (question, index) => {
    switch (question.type) {
        case "radio":
        case "checkbox":
            return <RadioCheckboxPreview question={question} index={index}/>;
        case "likert":
            return <LikertPreview question={question} index={index}/>;
        case "range":
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <RangePreview question={question} index={index}/>
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
                    <DropdownPreview question={question}/>
                </div>
            );
        case "textarea":
            return (
                <div style={style}>
                    <TextArea question={question}/>
                </div>
            );
        case "number":
            return <NumberPreview question={question}/>;
        case "date":
            return <DatePickerPreview question={question}/>;
        case "time":
            return <TimePickerPreview question={question}/>;
        case "textfield":
            return <TextFieldPreview question={question}/>;
        case "drawing":
            return (
                <div style={style}>
                    <DrawingPreview question={question}/>
                </div>
            );
        case "raw":
            return <RawPreview question={question}/>;
        default:
            return <RadioCheckboxPreview question={question} index={index}/>;
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
                    <RemoveQuestionButton question={question} index={index}/>
                    <EditQuestionButton question={question} index={index}/>
                    <DuplicateQuestionButton question={question} index={index}/>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    );
};
