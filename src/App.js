import React, {useState} from "react";
import QuestionsPage from "./components/QuestionsPage";
import {AppBar, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar, Typography,} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {AntSwitch} from "./AntSwitch";
import "./background.css";
import {Provider} from "react-redux";
import store from "./app/store";
import NavBar from "./components/buttons/nav";
import {Auth0Provider, useAuth0} from "./components/react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import {Header, TemporaryDrawer} from "./components/TemporaryDrawer";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Profile from "./components/Profile";
import {Router, Route, Switch} from "react-router-dom";


const themeObject = {
    palette: {
        type: "light",
    },
};
export const useDarkMode = () => {
    const [theme, setTheme] = useState(themeObject);
    const {
        palette: {type},
    } = theme;
    const toggleDarkMode = () => {
        const updatedTheme = {
            ...theme,
            palette: {
                ...theme.palette,
                type: type === "light" ? "dark" : "light",
            },
        };
        setTheme(updatedTheme);
    };
    return [theme, toggleDarkMode];
};
const useStyles = makeStyles((theme) => ({
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
        background: "linear-gradient(45deg, #7c4dff 30%, #80deea 90%)",
    },
}));

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

function testApi() {

}

function App() {

    const [theme, toggleDarkMode] = useDarkMode();
    const themeConfig = createMuiTheme(theme);

    const classes = useStyles();
    return (
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <Provider store={store}>
                <div className="content">
                    <MuiThemeProvider theme={themeConfig}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <Router history={history}>
                                        <header>
                                            {/*<NavBar/>*/}
                                        </header>
                                        <Switch>
                                            <Route path="/" exact/>
                                            <Route path="/profile" component={Profile}/>
                                        </Switch>
                                    </Router>
                                    <TemporaryDrawer/>
                                    <Typography variant="h6" className={classes.title}>
                                        Questionnaire Interface
                                    </Typography>
                                    <Typography component="div">
                                        <Grid
                                            component="label"
                                            container
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Grid item>Light Mode</Grid>
                                            <Grid item>
                                                <AntSwitch onChange={toggleDarkMode} value="checkedC"/>
                                            </Grid>
                                            <Grid item>Dark Mode</Grid>
                                        </Grid>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <QuestionsPage/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </Provider>
        </Auth0Provider>
    );
}
export default App;
