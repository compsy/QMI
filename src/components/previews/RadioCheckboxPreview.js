import React from "react";
import {Checkbox, Grid, Radio, Typography} from "@material-ui/core";

const RadioCheckboxPreview = ({question}) => {
    return (
        <Grid container direction="column" spacing={1}>
            {question.options.map((option, index) => (
                <Grid item xs key={option + index}>
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
                            <Typography variant="body1" data-cy={option}>
                                {typeof option === "string" ? option : option.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default RadioCheckboxPreview;
