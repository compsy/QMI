import React, {useState} from "react";
import {
    AppBar,
    createMuiTheme,
    CssBaseline,
    makeStyles,
    MuiThemeProvider,
    Toolbar,
    Typography,
} from "@material-ui/core";
import "./background.css";
import {Provider} from "react-redux";
import store from "./app/store";
import {Auth0Provider, useAuth0} from "./components/react-auth0-spa";

import history from "./utils/history";
import {useDarkMode} from "./useDarkMode";
import GeneralSidebar, {getUserCard} from "./components/GeneralSidebar";
import {LandingPage} from "./components/LandingPage/LandingPage";
import {auth_config} from "./features/API/auth_config";


const themeObject = {
    palette: {
        type: "white",
    },
};

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
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
        backgroundColor: "#142850",
    },
    list: {
        width: 250,
        color: "white"
    },
    drawer: {
        height: "100%",
        backgroundColor: "#00909e",
    },
    header: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "white"
    }
}));

function LandingApp() {
    const [theme, toggleDarkMode] = useDarkMode();
    const themeConfig = createMuiTheme(theme);
    const classes = useStyles();

    const MainWrapper = ({...props}) => {
        return <Auth0Provider
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
                            {props.children}
                        </div>
                    </MuiThemeProvider>
                </div>
            </Provider></Auth0Provider>

    };
    return (
        <MainWrapper>
            <AppBar className={classes.appBar} justify="space-between">
                <Toolbar>
                    <GeneralSidebar/>
                    <Typography variant="h6" className={classes.title}>
                        Questionnaires
                    </Typography>

                </Toolbar>

            </AppBar>
            <CssBaseline/>
            <LandingPage/>
        </MainWrapper>

    );
}

export default LandingApp;
