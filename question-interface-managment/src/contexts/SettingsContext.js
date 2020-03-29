import React, { createContext, useReducer } from "react";
import { settingsReducer } from "../reducers/settingsReducer";

export const SettingsContext = createContext();

const SettingsContextProvider = props => {
  const [settings, settingsDispatch] = useReducer(settingsReducer, {
    showGridAreas: false,
    destinationIndex: -1
  });
  return (
    <SettingsContext.Provider value={{ settings, settingsDispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
