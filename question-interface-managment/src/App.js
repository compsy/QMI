import React from "react";
import SettingsContextProvider from "./contexts/SettingsContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext";
import QuestionsPage from "./components/QuestionsPage";
import './components/background.css'
import "typeface-roboto";

function App() {
    return (
        <div className="App">
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            >
                <SettingsContextProvider>
                    <QuestionnaireContextProvider>
                        <QuestionsPage />
                    </QuestionnaireContextProvider>
                </SettingsContextProvider>
            </div>
        </div>
    );
}

export default App;
