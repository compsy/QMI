import React, {useState} from "react";
import SettingsContextProvider from "./contexts/SettingsContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext";
import QuestionsPage from "./components/QuestionsPage";
import "./components/background.css";
import {Switch, FormControlLabel, Toolbar, Typography, AppBar, makeStyles} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider, ThemeProvider} from "@material-ui/core";

const themeObject = {
    palette: {
        type: 'light'
    }
};
const useDarkMode = () => {
    const [theme, setTheme] = useState(themeObject);
    const {palette : {type}} = theme;
    const toggleDarkMode = () => {
        const updatedTheme = {
            ...theme,
            palette: {
                ...theme.palette,
                type: type === 'light' ? 'dark' : 'light'
            }
        };
        setTheme(updatedTheme);
    };
    return [theme, toggleDarkMode]
};
const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        color: "white",
        alignItems: "center",
        background: 'linear-gradient(45deg, #7c4dff 30%, #80deea 90%)',
    }
}));

function App() {
    const [theme, toggleDarkMode] =  useDarkMode();
    const themeConfig = createMuiTheme(theme);
    const classes = useStyles();
    return (
        <MuiThemeProvider  theme={themeConfig}>
            <div style={{display: "flex", flexDirection: "column"}}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h4" noWrap>
                        Questionnaire Editor
                        <FormControlLabel control = {<Switch onClick = {toggleDarkMode} />}/>
                    </Typography>
                </Toolbar>
            </AppBar>

                <SettingsContextProvider>
                    <QuestionnaireContextProvider>
                        <QuestionsPage />
                    </QuestionnaireContextProvider>

                </SettingsContextProvider>
            </div>

        </MuiThemeProvider>
    );
}

export default App;
