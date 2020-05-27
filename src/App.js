import React from "react";
import QuestionsPage from "./components/QuestionsPage";
import {AppBar, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar, Typography,} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {AntSwitch} from "./AntSwitch";
import "./background.css";
import {Provider} from "react-redux";
import store from "./app/store";
import {Auth0Provider} from "./components/react-auth0-spa";
import history from "./utils/history";
import {Route, Router, Switch} from "react-router-dom";
import {useDarkMode} from "./useDarkMode";
import {auth_config} from "./features/API/auth_config";
import GeneralSidebar from "./components/GeneralSidebar";
import {LandingPage} from "./components/LandingPage/LandingPage";
import {EraseQuestionnaireButton} from "./NavigationBarButtons/EraseQuestionnaireButton";
import {RenderQuestionnaireButton} from "./NavigationBarButtons/RenderQuestionnaireButton";
import {SaveQuestionnaireButton} from "./NavigationBarButtons/SaveQuestionnaireButton";

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
    return (
        <Auth0Provider
            domain={auth_config.domain}
            client_id={auth_config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={auth_config.audience}
            responseType={auth_config.responseType}
            scope={auth_config.scope}
        >

            <Provider store={store}>
                <div className="content">
                    <MuiThemeProvider theme={themeConfig}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            {/*<NavigationBar theme2={theme}/>*/}
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <Router history={history}>
                                        <GeneralSidebar/>
                                        <Switch/>
                                    </Router>
                                    <EraseQuestionnaireButton/>
                                    <RenderQuestionnaireButton/>
                                    <SaveQuestionnaireButton/>
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
                                                <AntSwitch data-cy="darkModeSwitcher" mode={themeConfig.palette.type} onChange={toggleDarkMode} value="checkedC"/>
                                            </Grid>

                                            <Grid item>Dark Mode</Grid>
                                        </Grid>
                                    </Typography>
                                    {/*<IconUser/>*/}
                                </Toolbar>
                            </AppBar>
                            <Router history={history}>
                                <Route path="/" exact>
                                    <QuestionsPage/>
                                </Route>
                                <Route path="/home">
                                    <LandingPage/>
                                </Route>
                            </Router>

                        </div>
                    </MuiThemeProvider>
                </div>
            </Provider>
        </Auth0Provider>
    );
}
export default App;
