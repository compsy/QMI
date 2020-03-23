import React from "react";
import SettingsContextProvider from "./contexts/SettingsContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext";
import QuestionsPage from "./components/QuestionsPage";

function App() {
  return (
    <div className="App">
      <SettingsContextProvider>
        <QuestionnaireContextProvider>
          <QuestionsPage />
        </QuestionnaireContextProvider>
      </SettingsContextProvider>
    </div>
  );
}

export default App;
