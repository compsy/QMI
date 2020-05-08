import React from "react";
import {Grid, Radio, Typography} from "@material-ui/core";

const LikertPreview = ({question}) => {
    const renderBox = () =>
        <Grid
            item
            xs={"auto"}
            style={{
                textAlign: "center",
            }}
        >
            <Radio disabled/>
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
            }}
        >
            <Typography variant="body1">{printOption(option)}</Typography>
        </Grid>;


    const renderOption = (option) =>
        <Grid
            item
            xs={"auto"}
            key={option.numeric_value}
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
            spacing={1}
        >
            {question.options.map(option => (renderOption(typeof (option) === "string" ? option : option.title)))}
        </Grid>
    );
};

export default LikertPreview;
