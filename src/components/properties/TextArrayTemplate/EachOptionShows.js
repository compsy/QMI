import React, {useContext} from "react";
import {Button, makeStyles, Menu, MenuItem,} from "@material-ui/core";
import {QuestionnaireContext} from "../../../contexts/QuestionnaireContext";
import { useDispatch, useSelector } from "react-redux";
import { addToToDispatch } from "../../../features/utilities/utilitiesSlice";

const useStyles = makeStyles((theme) => ({
    showsHidesButtons: {
        transform: "scale(0.8)",
        // marginLeft: theme.spacing(1),
    },
}));

const EachOptionShows = ({ index }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Access store to get non-hidden questions
    // const shown = store.getState();
    const questions = useSelector(state => state.questions);
    const hidden = questions.filter((q) => q.hidden === true);

    const dispatch = useDispatch();

    const handleMenuItemClick = key = event => {
        dispatch(addToToDispatch({ type: "showsMap", key: key, value: {qid: questions[index].id, oid: 0} }))
    }

    const classes = useStyles();
    return (
        <>
            <Button
                className={classes.showsHidesButtons}
                disableElevation
                size="small"
                variant="contained"
                onClick={handleClick}
            >
                shows
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                // elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                {hidden &&
                hidden.map((item, i) => {
                    const index = questions.indexOf(item);
                    return (
                        <MenuItem button={true} onClick={handleMenuItemClick(item)}>
                            {`v${index + 1}: ${
                                item.title && item.title
                            }`}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default EachOptionShows;