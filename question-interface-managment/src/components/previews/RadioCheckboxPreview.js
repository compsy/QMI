import React, { useContext } from "react";
import { Grid, Typography, Radio, Checkbox } from "@material-ui/core";
import { SettingsContext } from "../../contexts/SettingsContext";

const RadioCheckboxPreview = ({ question }) => {
  const { settings } = useContext(SettingsContext);
  return (
    <Grid
      container
      direction="column"
      style={{
        background: settings.showGridAreas ? "pink" : "transparent",
        opacity: settings.showGridAreas ? "0.8" : "1.0"
      }}
      spacing={1}
    >
      {question.options.map(option => (
        <Grid
          item
          xs
          style={{
            background: settings.showGridAreas ? "yellow" : "transparent",
            opacity: settings.showGridAreas ? "0.8" : "1.0"
          }}
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid
              item
              xs={2}
              style={{
                textAlign: "center",
                background: settings.showGridAreas ? "grey" : "transparent",
                opacity: settings.showGridAreas ? "0.8" : "1.0"
              }}
            >
              {question.type === "checkbox" ? <Checkbox disabled /> : <Radio disabled />}
            </Grid>
            <Grid
              item
              xs={9}
              style={{
                wordWrap: "break-word",
                textAlign: "left",
                background: settings.showGridAreas
                  ? "mediumpurple"
                  : "transparent",
                opacity: settings.showGridAreas ? "0.8" : "1.0"
              }}
            >
              <Typography variant="body1">{option}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default RadioCheckboxPreview;
