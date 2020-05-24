import React from "react";
import {Checkbox, Grid, Radio, Typography} from "@material-ui/core";

const RadioCheckboxPreview = ({question, index}) => {
    return (
        <Grid container direction="column" spacing={1} id={"optionPanel" + index}>
            {question.options.map((option, Optionindex) => (
                <Grid item xs key={option + Optionindex}>
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
                            }}
                        >
                            {question.type === "checkbox" ? <Checkbox/> : <Radio/>}
                        </Grid>
                        <Grid
                            item

                            xs={9}
                            style={{
                                wordWrap: "break-word",
                                textAlign: "left",
                            }}
                        >
                            <div id={option} data-cy={"question" + (index + 1) + option}>
                                <Typography variant="body1" data-cy={option.title}>
                                    {typeof option === "string" ? option : option.title}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default RadioCheckboxPreview;
