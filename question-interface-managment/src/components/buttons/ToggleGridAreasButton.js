import React, { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { Button } from "@material-ui/core";

const ToggleGridAreasButton = () => {
  const { dispatch } = useContext(SettingsContext);
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => dispatch({ type: "TOGGLE_GRID_AREAS" })}
        style={{ margin: "0.5em auto" }}
      >
        toggle grid areas
      </Button>
    </div>
  );
};

export default ToggleGridAreasButton;
