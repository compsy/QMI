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

export const TextArrayProperty = ({ name, propertyName }) => {
  const property = useSelector(selectProperty(propertyName));
  const dispatch = useDispatch();

  useEffect(() => {
    if (property === undefined) {
      dispatch(setProperty({ property: propertyName, value: [] }));
    }
  }, [property]);

  const handleAddOptionClick = () => {
    dispatch(
      setProperty({
        property: propertyName,
        value: [...property, ""],
      })
    );
  };

  const classes = useStyles();
  return (
    <>
      <Paper elevation={0} variant="outlined" className={classes.paper}>
        {property.length > 0 ? (
          property.map((_, index) => (
            <EachOptioni
              index={index}
              name={name}
              propertyName={propertyName}
            />
          ))
        ) : (
          <Grid
            className={classes.noneBox}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="body1"
                style={{ userSelect: "none" }}
              >{`no ${propertyName} provided`}</Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
      <Box textAlign="center">
        <AddOptionButton onClick={handleAddOptionClick} />
      </Box>
    </>
  );
};

function EachOptioni({ index, name, propertyName }) {
  const type = useSelector(selectProperty("type"));
  const option = useSelector((state) => state.question[propertyName][index]);
  const dispatch = useDispatch();

  // makes sure the options are in object format (unless range type)
  useEffect(() => {
    if (type !== "range" && typeof option === "string") {
      dispatch(
        setTextArrayElement({
          property: propertyName,
          index: index,
          value: { ...CLEAN_SUPER_OPTION, title: option },
        })
      );
    }
  }, [option]);

  const handleChange = (index, event) => {
    if (type !== "range") {
      dispatch(
        setTextArrayElement({
          property: propertyName,
          index: index,
          value: { ...option, title: event.target.value },
        })
      );
    } else {
      dispatch(
        setTextArrayField({
          property: propertyName,
          index: index,
          value: event.target.value,
        })
      );
    }
  };

  const handleRemoveOptionClick = (index) =>
    dispatch(removeOption({ property: propertyName, index: index }));

  const classes = useStyles();
  return (
    // <Slide in direction="right">
    <FormControl fullWidth required>
      <InputLabel variant="filled" style={{ userSelect: "none" }}>
        {type === "range" ? `Label ${index + 1}` : `Option ${index + 1}`}
      </InputLabel>
      <FilledInput
        // required
        className={classes.boxy}
        autoFocus
        autoComplete="off"
        type="text"
        id={`option-${index + 1}`}
        placeholder={
          type === "range"
            ? "Enter range label here.."
            : "Enter option title here.."
        }
        value={(type === "range" ? option : option["title"]) || ""}
        onChange={(e) => handleChange(index, e)}
        endAdornment={
          <InputAdornment position="end">
            {type !== "range" && (
              <>
                <EachOptionShows />
                <EachOptionHides />
                <EachOptionMenu propertyName={propertyName} index={index} />
              </>
            )}
            <IconButton
              size="small"
              onClick={() => handleRemoveOptionClick(index)}
            >
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    // </Slide>
  );
}

const AddOptionButton = (props) => {
  const type = useSelector(selectProperty("type"));
  const classes = useStyles();
  return (
    <Tooltip title={type === "range" ? "add a label" : "add an option"}>
      <Button
        disableElevation
        variant="contained"
        fullWidth
        color="primary"
        className={classes.button}
        {...props}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
};

const EachOptionMenu = ({ propertyName, index }) => {
  // MENU STUFF
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // ----------

  const option = useSelector((state) => state.question[propertyName][index]);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <>
      <IconButton size="small" onClick={handleMenuClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* switch case without break for options */}
        <MenuItem className={classes.menuItem} button={false}>
          <FormControl fullWidth>
            <InputLabel variant="filled">Numeric value</InputLabel>
            <FilledInput
              required
              autoFocus
              autoComplete="off"
              type="number"
              placeholder="Enter an integer (or a float).."
              value={option["numeric_value"] || ""}
              onChange={(e) =>
                dispatch(
                  setTextArrayElement({
                    property: propertyName,
                    index: index,
                    value: { ...option, numeric_value: Number(e.target.value) },
                  })
                )
              }
              endAdornment={
                <InputAdornment position="end">
                  <Switch
                    color="primary"
                    // id={`tooltip-switch`}
                    // checked={open}
                    // onClick={handleClick}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        </MenuItem>
        <MenuItem className={classes.menuItem} button={false}>
          <FormControl fullWidth>
            <InputLabel variant="filled">Option tooltip</InputLabel>
            <FilledInput
              required
              autoFocus
              autoComplete="off"
              type="text"
              placeholder="Enter option tooltip text here.."
              value={option["tooltip"] || ""}
              onChange={(e) =>
                dispatch(
                  setTextArrayElement({
                    property: propertyName,
                    index: index,
                    value: { ...option, tooltip: e.target.value },
                  })
                )
              }
              endAdornment={
                <InputAdornment position="end">
                  <Switch
                    color="primary"
                    // id={`tooltip-switch`}
                    // checked={open}
                    // onClick={handleClick}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
        </MenuItem>
        <MenuItem className={classes.menuItem} button={false}>
          <FormControlLabel
            style={{ userSelect: "none" }}
            label="Stop subscription"
            control={
              <Switch
                checked={option["stop_subscription"] || false}
                color="primary"
                onChange={(e) =>
                  dispatch(
                    setTextArrayElement({
                      property: propertyName,
                      index: index,
                      value: { ...option, stop_subscription: e.target.checked },
                    })
                  )
                }
              />
            }
          />
        </MenuItem>
      </Menu>
    </>
  );
};

const EachOptionShows = () => {
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
  const hidden = questions.filter((q) => q.hidden === true);

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
