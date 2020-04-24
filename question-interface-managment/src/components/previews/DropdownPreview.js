import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {SettingsContext} from "../../contexts/SettingsContext";
import {Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    button: {
        display: "block",
        marginTop: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

const DropdownPreview = ({ question }) => {
    const { settings } = useContext(SettingsContext);
    const classes = useStyles();
    const [age, setAge] = React.useState("");
    const [open, setOpen] = React.useState(false);


    const handleChange = event => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    return (
        <div>
            <Button className={classes.button} onClick={handleOpen}>
                Open the select
            </Button>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">test</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {question.options.map(option =>
                        <MenuItem key={option.title+option.numeric_value} value={option.numeric_value}>
                            <em>{option.title}</em>
                        </MenuItem>
                    )}


                </Select>
            </FormControl>
        </div>

    );
};


export default DropdownPreview
