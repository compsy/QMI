import {useSelector} from "react-redux";
import React, {useState} from "react";
import {ExpansionPanelSummary, Grid, Typography} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import EditQuestionTitleField from "../Molecules/EditDialogTitle";
import ReactHtmlParser from "react-html-parser";
import {renderQuestionHeaderElements} from "../Molecules/RenderQuestionHeaderElements";

export const ExpansionRule = ({question, provided, ...props}) => {
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
                      data-cy={"draghandle" + (index + 1)}
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
                    id={questions.indexOf(question) + 1}
                >
                    {editTitle ? (
                        <EditQuestionTitleField
                            question={question}
                            onComplete={() => setEditTitle(false)}
                        />
                    ) : (
                        <Typography
                            onDoubleClick={() => question.type === "raw" ? setEditTitle(false) : setEditTitle(true)}
                            variant="h5">

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
                    {renderQuestionHeaderElements(question, index)}
                </Grid>
            </Grid>
        </ExpansionPanelSummary>
    );
};
