import React from "react";
import SettingsContextProvider from "./contexts/SettingsContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext";
import QuestionsPage from "./components/QuestionsPage";
import "./components/background.css";
import "typeface-roboto";
import useTheme from "./hooks/useTheme";
import { ThemeProvider } from "@material-ui/core";

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <SettingsContextProvider>
            <QuestionnaireContextProvider>
              <QuestionsPage />
            </QuestionnaireContextProvider>
          </SettingsContextProvider>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
