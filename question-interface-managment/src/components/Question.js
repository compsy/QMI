import React, { useContext } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import { SettingsContext } from "../contexts/SettingsContext";
import RemoveQuestionButton from "./buttons/RemoveQuestionButton";
import EditQuestionButton from "./buttons/EditQuestionButton";
import RadioCheckboxPreview from "./previews/RadioCheckboxPreview";

const Question = ({ question }) => {
  return (
    <ExpansionPanel>
      <Summary question={question} />
      <Divider />
      <Details question={question} />
    </ExpansionPanel>
  );
};

export default Question;

const Summary = ({ question }) => {
  const { settings } = useContext(SettingsContext);
  const { questions } = useContext(QuestionnaireContext);

  return (
    <ExpansionPanelSummary>
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
                return <RadioCheckboxPreview question={question} />;
              case "checkbox":
                return <RadioCheckboxPreview question={question} />;
              default:
                return <RadioCheckboxPreview question={question} />;
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
