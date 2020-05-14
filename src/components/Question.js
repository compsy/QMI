import React, {useState} from "react";
import {
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography,
    Badge
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import DragHandleIcon from "@material-ui/icons/DragHandle";
import RawPreview from "./previews/RawPreview";
import EditQuestionTitleField from "./EditDialogTitle";
import DuplicateQuestionButton from "./buttons/DuplicateQuestionButton";
import ReactHtmlParser from "react-html-parser";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useSelector} from "react-redux";
import store from "../app/store";

const Question = ({index, question, ...props}) => {
    const [open, setOpen] = useState(false);

    return (
        <Draggable key={question.id} draggableId={question.id} index={index}>
            {(provided, snapshot) => (
                <div
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
                        {/* <Summary onClick={() => setOpen(!open)} question={question} onMouseDown={() => setOpen(!open)}/> */}
                        <Divider/>
                        <Details question={question} index={index}/>
                    </ExpansionPanel>
                </div>
            )}
        </Draggable>
    );
};

const HiddenQuestionIndicator = ({ question }) => {
    const utilities = store.getState().utilities;
    return question.hidden ? (
        <Badge
            badgeContent={(utilities.showsMap[question.id] && utilities.showsMap[question.id].length) || 0}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            overlap="circle"
        >
            <Tooltip title="This question will be hidden from the user.">
                <IconButton aria-label="This question will be hidden from the user">
                    <VisibilityOffIcon />
                </IconButton>
            </Tooltip>
        </Badge>
    ) : (
        <Badge
            badgeContent={(utilities.hidesMap[question.id] && utilities.hidesMap[question.id].length) || 0}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            overlap="circle"
        >
            <Tooltip title="This question will be shown to the user.">
                <IconButton aria-label="This question will be shown to the user">
                    <VisibilityIcon />
                </IconButton>
            </Tooltip>
        </Badge>
    )
    }

function renderButtons(question, index) {
    const type = question.type;
    const elements = [];
    elements.push(<Grid item><HiddenQuestionIndicator key={elements.length} question={question}/></Grid>);
    if (type !== "raw") {
        elements.push(<Grid item><ExpandMoreIcon key={elements.length}/></Grid>);
    } else {
        elements.push(<Grid item><EditQuestionButton key={elements.length} question={question} index={index}/></Grid>);
        elements.push(<Grid item><DuplicateQuestionButton key={elements.length} question={question}/></Grid>);
        elements.push(<Grid item><RemoveQuestionButton key={elements.length} question={question} index={index}/></Grid>);
    }
    return <Grid container direction="row" justify="flex-end" alignItems="center">{elements}</Grid>
}

const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export default Question;

const Summary = ({question, provided, ...props}) => {
    // const { settings } = useContext(SettingsContext);
    // const { questions } = useContext(QuestionnaireContext);
    const questions = useSelector(state => state.questions);
    const [editTitle, setEditTitle] = useState(false);
    const index = questions.indexOf(question);


    return (
        <ExpansionPanelSummary {...props}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs
                      style={{
                          textAlign: "left",
                      }}
                      {...provided.dragHandleProps}

                >
                    <DragHandleIcon/>
                </Grid>


                <Grid
                    item
                    xs
                    style={{
                        textAlign: "left",
                    }}
                >
                    <Typography variant="h5">
                        {questions.indexOf(question) + 1}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={7}
                    style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                    }}
                    id = {questions.indexOf(question) + 1}
                >
                    {editTitle ? (
                        <EditQuestionTitleField
                            question={question}
                            onComplete={() => setEditTitle(false)}
                        />
                    ) : (
                        <Typography
                            onDoubleClick={() => question.type === "raw" ? setEditTitle(false) : setEditTitle(true)}
                            variant="h5" >

                            {question.type === "raw" ? ReactHtmlParser(question.content) : question.title}
                        </Typography>
                    )}
                </Grid>
                <Grid
                    item
                    xs={3}
                    style={{
                        textAlign: "right",
                    }}
                >
                    {renderButtons(question, index)}
                </Grid>
            </Grid>
        </ExpansionPanelSummary>
    );
};

const Details = ({question, index}) => {
    // const { settings } = useContext(SettingsContext);

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
                        {/* {`${question.type} options preview`.toUpperCase()} */}
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
                    {(() => {
                        switch (question.type) {
                            case "radio":
                            case "checkbox":
                                return <RadioCheckboxPreview question={question}/>;
                            case "likert":
                                return <LikertPreview question={question}/>;
                            case "range":
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <RangePreview question={question}/>
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
                                return <RadioCheckboxPreview question={question}/>;
                        }
                    })()}
                </Grid>
                <Grid
                    item
                    xs
                    style={{
                        textAlign: "center",
                    }}
                >
                    {(() => {
                        switch (question.type) {
                            case "raw":
                                return;

                            default:
                                return (
                                    <div>
                                        <RemoveQuestionButton question={question}/>
                                        <EditQuestionButton question={question} index={index}/>
                                        <DuplicateQuestionButton question={question} index={index}/>
                                    </div>
                                )

                        }
                    })()}
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    );
};
