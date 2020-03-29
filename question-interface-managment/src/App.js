import React from "react";
import SettingsContextProvider from "./contexts/SettingsContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext";
import QuestionsPage from "./components/QuestionsPage";
import Particles from 'react-particles-js';
import './components/background.css'


function App() {
    return (
        <div className="App" style={{backgroundColor: "black"}}>
            {/*<ParallaxBackground />*/}
            <Particles/>
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
                        <QuestionsPage/>
                    </QuestionnaireContextProvider>
                </SettingsContextProvider>
            </div>
            <Particles/>

        </div>
    );
}

export default App;
