import React from "react";
import Grid from "@material-ui/core/Grid";
import {HiddenProperty, RequiredProperty, ShowOtherwiseProperty} from "./BooleanProperties";
import {OtherwiseLabelProperty, OtherwiseTooltipProperty,} from "./TextProperties";
import {
    DensityProperty,
    HeightProperty,
    HoursFromProperty,
    HoursStepProperty,
    HoursToProperty,
    MaxLengthProperty,
    MaxProperty,
    MinProperty,
    RadiusProperty,
    StepProperty,
    WidthProperty,
} from "./NumericProperties";
import {useSelector} from "react-redux";
import {selectProperty} from "../../features/question/questionSlice";
import {FilledInput} from "@material-ui/core";

// not in use yet
export const DataMethodProperty = ({...props}) => {
    return null;
};
export const ExpandableContentProperty = ({...props}) => null;

// Composite properties. These consists of smaller properties, depending on each other:
export const OtherwiseProperty = () => {
    const showOtherwise = useSelector(selectProperty("show_otherwise"));
    return (
        <>
            <ShowOtherwiseProperty/>
            {showOtherwise ? (
                <Grid item xs style={{textAlign: "center", margin: "1em 0"}}>
                    <OtherwiseLabelProperty/>
                    <OtherwiseTooltipProperty/>
                </Grid>
            ) : null}
        </>
    );
};


export const CustomMinMaxStepProperty = () => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={4}>
                <MaxProperty/>
            </Grid>
            <Grid item xs={4}>
                <MinProperty/>
            </Grid>
            <Grid item xs={4}>
                <StepProperty/>
            </Grid>
        </Grid>
    );
};

export const HoursCompositeProperty = () => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={4}>
                <HoursFromProperty/>
            </Grid>
            <Grid item xs={4}>
                <HoursToProperty/>
            </Grid>
            <Grid item xs={4}>
                <HoursStepProperty/>
            </Grid>
        </Grid>
    );
};

export const NumberTypeComposite = () => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={4}>
                <MinProperty/>
            </Grid>
            <Grid item xs={4}>
                <MaxProperty/>
            </Grid>
            <Grid item xs={4}>
                <MaxLengthProperty/>
            </Grid>
        </Grid>
    );
};

export const WidthHeightComposite = () => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs>
                <WidthProperty/>
            </Grid>
            <Grid item xs data-cy={"drawingHeight"}>
                <HeightProperty/>
            </Grid>
        </Grid>
    );
};


export const RadiusDensityComposite = () => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs>
                <RadiusProperty/>
            </Grid>
            <Grid item xs>
                <DensityProperty/>
            </Grid>
        </Grid>
    );
};


export const HiddenRequiredComposite = () => {
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            <Grid item>
                <HiddenProperty/>
            </Grid>
            <Grid item xs>
                <RequiredProperty/>
            </Grid>
        </Grid>
    );
};