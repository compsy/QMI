import React, {useContext} from "react";
import {Grid, Radio, Typography} from "@material-ui/core";
import {SettingsContext} from "../../contexts/SettingsContext";

const LikertPreview = ({ question }) => {
  const { settings } = useContext(SettingsContext);
  const renderBox = () =>
    <Grid
    item
    xs={"auto"}
    style={{
      textAlign: "center",
      background: settings.showGridAreas ? "grey" : "transparent",
      opacity: settings.showGridAreas ? "0.8" : "1.0"
    }}
  >
    <Radio disabled />
  </Grid>;

    const printOption = (option) => {
        return option.numeric_value === undefined ? option : option.title + " (" + option.numeric_value + ")"
    };

  const renderText = (option) =>
    <Grid
    item
    xs={"auto"}
    style={{
      wordWrap: "break-word",
      textAlign: "left",
      background: settings.showGridAreas
        ? "mediumpurple"
        : "transparent",
      opacity: settings.showGridAreas ? "0.8" : "1.0"
    }}
  >
    <Typography variant="body1">{ printOption(option) }</Typography>
  </Grid>;



  const renderOption = (option) =>
    <Grid
      item
      xs={"auto"}
      key={option.numeric_value}
      style={{
        background: settings.showGridAreas ? "yellow" : "transparent",
        opacity: settings.showGridAreas ? "0.8" : "1.0"
      }}
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {renderBox()}
        {renderText(option)}
      </Grid>
    </Grid>;

  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      style={{
        background: settings.showGridAreas ? "pink" : "transparent",
        opacity: settings.showGridAreas ? "0.8" : "1.0"
      }}
      spacing={1}
    >
      {question.options.map(option => (renderOption(option)))}
    </Grid>
  );
};

export default LikertPreview;
