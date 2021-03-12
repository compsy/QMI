import React, {useState} from "react";
import {Divider, ExpansionPanel, ExpansionPanelDetails, Grid, Typography,} from "@material-ui/core";
import RemoveQuestionButton from "../Atoms/Buttons/RemoveQuestionButton";
import EditQuestionButton from "../Atoms/Buttons/EditQuestionButton";
import RadioCheckboxTypePreview from "../Atoms/Previews/RadioCheckboxTypePreview";
import LikertTypePreview from "../Atoms/Previews/LikertTypePreview";
import RangeTypePreview from "../Atoms/Previews/RangeTypePreview";
import DropdownTypePreview from "../Atoms/Previews/DropdownTypePreview";
import NumberTypePreview from "../Atoms/Previews/NumberTypePreview";
import DatePickerTypePreview from "../Atoms/Previews/DatePickerTypePreview";
import TimePickerPreview from "../Atoms/Previews/TimePickerTypePreview";
import TextAreaTypePreview from "../Atoms/Previews/TextAreaTypePreview";
import TextFieldTypePreview from "../Atoms/Previews/TextFieldTypePreview";
import DrawingTypePreview from "../Atoms/Previews/DrawingTypePreview";
import {Draggable} from "react-beautiful-dnd";
import "../index.css";
import RawPreview from "../Atoms/Previews/RawTypePreview";
import DuplicateQuestionButton from "../Atoms/Buttons/DuplicateQuestionButton";
import {ExpansionRule} from '../Organisms/ExpansionRule'
import UnsupportedQuestionTypePreview from "../Atoms/Previews/UnsupportedQuestionTypePreview";

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
