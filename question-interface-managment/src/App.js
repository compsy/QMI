import React, {useState} from "react";
import SettingsContextProvider from "./contexts/SettingsContext";
import QuestionnaireContextProvider from "./contexts/QuestionnaireContext";
import QuestionsPage from "./components/QuestionsPage";
import "./components/background.css";
import {AppBar, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import {AntSwitch} from './AntSwitch';
import SearchBar from "./SearchBar";

const themeObject = {
    palette: {
        type: 'light'
    }
};
const useDarkMode = () => {
    const [theme, setTheme] = useState(themeObject);
    const {palette: {type}} = theme;
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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        color: "white",
        textAlign: "center",
        background: 'linear-gradient(45deg, #7c4dff 30%, #80deea 90%)',
    },
}));

function App() {
    const [theme, toggleDarkMode] =  useDarkMode();
    const themeConfig = createMuiTheme(theme);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const classes = useStyles();
    return (
        <MuiThemeProvider  theme={themeConfig}>
            <div style={{display: "flex", flexDirection: "column"}}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Questionnaire Interface
                    </Typography>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Light Mode</Grid>
                            <Grid item>
                                <AntSwitch onChange={toggleDarkMode} value="checkedC"/>
                            </Grid>
                            <Grid item>Dark Mode</Grid>
                        </Grid>
                    </Typography>
                    <SearchBar/>
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
