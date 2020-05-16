import {Grid} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditQuestionButton from "./buttons/EditQuestionButton";
import DuplicateQuestionButton from "./buttons/DuplicateQuestionButton";
import RemoveQuestionButton from "./buttons/RemoveQuestionButton";
import React from "react";
import {HiddenQuestionIndicator} from "./HiddenQuestionIndicator";

export function renderButtons(question, index) {
    const type = question.type;
    const elements = [];
    elements.push(<Grid item><HiddenQuestionIndicator key={elements.length} question={question}/></Grid>);
    if (type !== "raw") {
        elements.push(<Grid item><ExpandMoreIcon key={elements.length}/></Grid>);
    } else {
        elements.push(<Grid item><EditQuestionButton key={elements.length} question={question} index={index}/></Grid>);
        elements.push(<Grid item><DuplicateQuestionButton key={elements.length} question={question}/></Grid>);
        elements.push(<Grid item><RemoveQuestionButton key={elements.length} question={question}
                                                       index={index}/></Grid>);
    }
    return <Grid container direction="row" justify="flex-end" alignItems="center">{elements}</Grid>
}