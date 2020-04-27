import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProperty,
  setTextArrayField,
  setTextArrayElement,
  setProperty,
  removeOption,
} from "../../features/questionProperties/questionSlice";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  FilledInput,
  Paper,
  Slide,
  Grid,
  Typography,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { CLEAN_SUPER_OPTION } from "../../utils";
// import store from "../../app/store";
import { useContext } from "react";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";

const useStyles = makeStyles((theme) => ({
  boxy: {
    borderRadius: 0,
  },
  paper: {
    height: "250px",
    overflow: "auto",
    wordWrap: "break-word",
    wordBreak: "break-word",
  },
  button: {
    marginTop: theme.spacing(2),
    height: "50px",
  },
  noneBox: {
    width: "100%",
    height: "100%",
  },
  menuItem: {
    outline: "none",
  },
  showsHidesButtons: {
    transform: "scale(0.8)",
    // marginLeft: theme.spacing(1),
  },
}));

const EachOptionHides = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Access store to get hidden: false questions
  // const shown = store.getState();
  const { questions } = useContext(QuestionnaireContext);
  const shown = questions.filter((q) => q.hidden === false);

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
        hides
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
        {shown &&
          shown.map((item, i) => {
            return (
              <MenuItem button={true}>
                {`v${questions.indexOf(item) + 1}: ${
                  item.title && item.title
                }`}
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};