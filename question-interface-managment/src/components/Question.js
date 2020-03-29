import React, {useContext, useState} from "react";
import {
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import {SettingsContext} from "../contexts/SettingsContext";
import RemoveQuestionButton from "./buttons/RemoveQuestionButton";
import EditQuestionButton from "./buttons/EditQuestionButton";
import RadioCheckboxPreview from "./previews/RadioCheckboxPreview";
import LikertPreview from "./previews/LikertPreview";
import RangePreview from "./previews/RangePreview";
import SelectPreview from "./previews/SelectPreview";
import TextArea from "./previews/TextArea";
import NumberPreview from "./previews/NumberPreview";
import DatePickerPreview from "./previews/DatePickerPreview";
import TimePickerPreview from "./previews/TimePickerPreview";
import TextFieldPreview from "./previews/TextFieldPreview";
import DrawingPreview from "./previews/DrawingPreview";

const Question = ({question, ...props}) => {
    const [open, setOpen] = useState(false);

    return (
        <ExpansionPanel expanded={open} {...props}>
            <Summary onClick={() => setOpen(!open)} question={question} />
            <Divider />
            <Details question={question} />
        </ExpansionPanel>
    );
};

export default Question;

const Summary = ({ question, ...props }) => {
    const { settings } = useContext(SettingsContext);
    const { questions } = useContext(QuestionnaireContext);

    return (
        <ExpansionPanelSummary {...props}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                style={{
                    background: settings.showGridAreas ? "lightgrey" : "transparent",
                    opacity: settings.showGridAreas ? "0.8" : "1.0"
                }}
            >
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "left",
                        background: settings.showGridAreas ? "lightgreen" : "transparent",
                        opacity: settings.showGridAreas ? "0.8" : "1.0"
                    }}
                >
                    <Typography variant="h5">
                        {questions.indexOf(question) + 1}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={8}
                    style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        background: settings.showGridAreas ? "lightblue" : "transparent",
                        opacity: settings.showGridAreas ? "0.8" : "1.0"
                    }}
                >
                    <Typography variant="h5">{question.title}</Typography>
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "right",
                        background: settings.showGridAreas ? "lightcoral" : "transparent",
                        opacity: settings.showGridAreas ? "0.8" : "1.0"
                    }}
                >
                    <ExpandMoreIcon />
                </Grid>
            </Grid>
        </ExpansionPanelSummary>
    );
};

const Details = ({ question }) => {
    const { settings } = useContext(SettingsContext);

    return (
        <ExpansionPanelDetails>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={1}
                style={{
                    background: settings.showGridAreas ? "lightgrey" : "transparent",
                    opacity: settings.showGridAreas ? "0.8" : "1.0"
                }}
            >
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                        background: settings.showGridAreas ? "lightgreen" : "transparent",
                        opacity: settings.showGridAreas ? "0.8" : "1.0"
                    }}
                >
                    <Typography variant="caption">
                        {/* {`${question.type} options preview`.toUpperCase()} */}
                        {question.type.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                        background: settings.showGridAreas ? "lightblue" : "transparent",
                        opacity: settings.showGridAreas ? "0.8" : "1.0"
                    }}
                >
                    {(() => {
                        switch (question.type) {
                            case "radio":
                                return <RadioCheckboxPreview question={question}/>;
                            case "checkbox":
                                return <RadioCheckboxPreview question={question}/>;
                            case "likert":
                                return <LikertPreview question={question}/>;
                            case "range":
                                return <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                ><RangePreview question={question}/>
                                </div>;
                            case "select":
                                return <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                ><SelectPreview question={question}/>
                                </div>;
                            case "textarea":
                                return <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                ><TextArea question={question}/>
                                </div>;
                            case "number":
                                return <NumberPreview question={question}/>;
                            case "date":
                                return <DatePickerPreview question={question}/>;
                            case "time":
                                return <TimePickerPreview question={question}/>;
                            case "text field":
                                return <TextFieldPreview question={question}/>;
                            case "draw":
                                return <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                ><DrawingPreview question={question}/></div>;
                            default:
                                return <RadioCheckboxPreview question={question}/>;
                        }
                    })()}
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                        background: settings.showGridAreas ? "lightcoral" : "transparent",
                        opacity: settings.showGridAreas ? "0.8" : "1.0"
                    }}
                >
                    <RemoveQuestionButton question={question} />
                    <EditQuestionButton question={question} />
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    );
};
