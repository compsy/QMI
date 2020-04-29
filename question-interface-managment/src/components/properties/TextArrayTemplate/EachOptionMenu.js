import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  FilledInput,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { setTextArrayElement } from "../../../features/questionProperties/questionSlice";
import { createElement } from "react";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    outline: "none",
  },
}));

const EachOptionMenu = ({ propertyName, index }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton size="small" onClick={handleMenuClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        // keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuElements propertyName={propertyName} index={index}/>
      </Menu>
    </>
  );
};

export default EachOptionMenu;

/* ----- USED IN EachOptionMenu BELOW ----- */

const NumericValueMenuItem = ({ propertyName, index }) => {
  const option = useSelector((state) => state.question[propertyName][index]);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
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
  );
};

const OptionTooltipMenuItem = ({ propertyName, index }) => {
  const option = useSelector((state) => state.question[propertyName][index]);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
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
  );
};

const StopSubscriptionMenuItem = ({ propertyName, index }) => {
  const option = useSelector((state) => state.question[propertyName][index]);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
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
  );
};

const optionMenuElements = {
  checkbox: [OptionTooltipMenuItem, StopSubscriptionMenuItem],
  radio: [
    OptionTooltipMenuItem,
    StopSubscriptionMenuItem,
    NumericValueMenuItem,
  ],
  likert: [NumericValueMenuItem],
  dropdown: [NumericValueMenuItem],
};

const MenuElements = ({ propertyName, index }) => {
  const type = useSelector((state) => state.question.type);
  return optionMenuElements[type].map((e) =>
    createElement(e, { propertyName, index }, null)
  );
};
