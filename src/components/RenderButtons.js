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
    elements.push(<Grid item key={elements.length}><HiddenQuestionIndicator question={question} index={index}/></Grid>);
    if (type !== "raw") {
        elements.push(<Grid item key={elements.length}><ExpandMoreIcon/></Grid>);
    } else {
        elements.push(<Grid item key={elements.length}><EditQuestionButton question={question} index={index}/></Grid>);
        elements.push(<Grid item key={elements.length}><DuplicateQuestionButton question={question}/></Grid>);
        elements.push(<Grid item key={elements.length}><RemoveQuestionButton question={question}
                                                                             index={index}/></Grid>);
    }
    return <Grid key="buttons" container direction="row" justify="flex-end" alignItems="center">{elements}</Grid>
}