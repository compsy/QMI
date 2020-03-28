import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },
});

function NumberPreview() {
    const classes = useStyles();


    return (
        <div >
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="1234" inputProps={{className:'digitsOnly'}} type="number" />
            </form>
        </div>
    );
}

export default NumberPreview;
