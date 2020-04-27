import React from "react";
import { useMediaQuery, createMuiTheme } from "@material-ui/core";

function useTheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? "#4dd0e1" : "#0288d1",
          },
          secondary: {
            main: prefersDarkMode ? "#ffb74d" : "#f06292",
          }
        },
      }),
    [prefersDarkMode]
  );
  return theme;
}

export default useTheme;
