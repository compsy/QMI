import React, { createContext, useReducer } from "react";
import { settingsReducer } from "../reducers/settingsReducer";

export const SettingsContext = createContext();

const SettingsContextProvider = props => {
  const [settings, dispatch] = useReducer(settingsReducer, {
    showGridAreas: false
  });
  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
