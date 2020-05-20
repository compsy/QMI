import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from "@date-io/date-fns"
import {MuiPickersUtilsProvider,} from '@material-ui/pickers';
import TextField from "@material-ui/core/TextField";


const TimerPickerPreview = ({question}) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = date => {
        setSelectedDate(date);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <TextField
                    id="time"
                    type="time"
                    color="primary"
                    hours_from="0"
                    hours_to="11"
                    size="large"
                    defaultValue="10:10"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                        style: {fontSize: 25}
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
};
export default TimerPickerPreview
