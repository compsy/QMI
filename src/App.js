import React, {useState} from "react";
import QuestionsPage from "./components/QuestionsPage";
import {AppBar, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar, Typography,} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {AntSwitch} from "./AntSwitch";
import "./background.css";
import {Provider} from "react-redux";
import store from "./app/store";
import {Auth0Provider} from "./components/react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import Profile from "./components/Profile";
import {Route, Router, Switch} from "react-router-dom";
import {useDarkMode} from "./useDarkMode";
import GeneralSidebar from "./components/GeneralSidebar";
import {CreateNewQuestionnaireDialog} from "./components/CreateNewQuestionnaireDialog";

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



function App() {
    const [theme, toggleDarkMode] = useDarkMode();
    const themeConfig = createMuiTheme(theme);
    const classes = useStyles();
    const [showCreateQuestionnaire, setShowCreateQuestionnaire] = useState(false);
    return (
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={config.audience}
            responseType={config.responseType}
            scope={config.scope}
        >
            <Provider store={store}>
                <div className="content">
                    <MuiThemeProvider theme={themeConfig}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <Router history={history}>
                                        <Switch>
                                            <Route path="/" exact/>
                                            <Route path="/profile" component={Profile}/>
                                        </Switch>
                                    </Router>
                                    <GeneralSidebar setShowCreateQuestionnaire={setShowCreateQuestionnaire}/>
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
                            {showCreateQuestionnaire &&
                            <CreateNewQuestionnaireDialog open={showCreateQuestionnaire}
                                                          setOpen={setShowCreateQuestionnaire}/>
                            }
                            <QuestionsPage/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </Provider>
        </Auth0Provider>
    );
}
export default App;
