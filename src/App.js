import React, {useState} from "react";
import QuestionsPage from "./components/QuestionsPage";
import {AppBar, createMuiTheme, makeStyles, MuiThemeProvider, Toolbar, Typography,} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {AntSwitch} from "./AntSwitch";
import "./background.css";
import {Provider} from "react-redux";
import store from "./app/store";
import {Auth0Provider, useAuth0} from "./components/react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import {Header, TemporaryDrawer, UserInformationCard} from "./components/TemporaryDrawer";
import Profile from "./components/Profile";
import {Route, Router, Switch} from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import Button from "@material-ui/core/Button";
import {useDarkMode} from "./useDarkMode"


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

function TestApi({getTokenSilently, getIdTokenClaims}){

    const getToken = (authCode) => {
        const request = require("request");
        console.log(authCode);
        const options = {
            method: 'POST',
            url: 'https://kanadev-dev.eu.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form: {
                grant_type: 'authorization_code',
                client_id: '49p7Y8ZUytfeP9WJXW8bQ14QqFJR7Q5T',
                client_secret: '9ojvbU5oWXaMJEKCrAnNc8sAZW0wmTGAFNJR9wn1K_xBNY4W7zFH6beKhLOfcAGB',
                code: authCode,
                redirect_uri: 'http://localhost:3000'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            if(!body.hasOwnProperty('access_token')) throw new Error(body);

            return body.access_token;
        });
    }

    const callApi = async () =>{
        const request = require("request");
        const jwtDecode = require("jwt-decode");
        const token = await getTokenSilently();

        /*
        console.log(btoa("-----BEGIN CERTIFICATE-----\n" +
          "MIIDCzCCAfOgAwIBAgIJSVbsDO/vXlo3MA0GCSqGSIb3DQEBCwUAMCMxITAfBgNV\n" +
          "BAMTGGthbmFkZXYtZGV2LmV1LmF1dGgwLmNvbTAeFw0yMDA1MTExNDM2MDVaFw0z\n" +
          "NDAxMTgxNDM2MDVaMCMxITAfBgNVBAMTGGthbmFkZXYtZGV2LmV1LmF1dGgwLmNv\n" +
          "bTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALUxqmClqHMoBQd5YYyq\n" +
          "1cHFX0/LBwXGiZ0eMMe8GC1FHILwgipaWBVhVL/TrIgBylxdjoIb4bsNdldGwZtP\n" +
          "XB1bsg7ku3x32nhHIaPHAme5kzL/liHPINzBqJVNKHQ2I5cmD3OIjvmCkXcMi+aR\n" +
          "bIMoS1UFR0XvpmWQbqIjV7R4C5jHJMjczy9WKLIpAvjhyAMQzUi1HAYRxEOYMAe+\n" +
          "oegEMG9aXRz3T259h4CBluCA0JrO3XLRdAMO9c5JyrTh76epcumVs/KEbhalyHaQ\n" +
          "nv0XRf+Xea0iHrhzFOGaVDg2J3+ln9Gkig6EikBAelkM9toEDHUQSVCln2+EvvPX\n" +
          "IiMCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQULUYfGBJSFNtY\n" +
          "Gu8e9u5sE6jh6WkwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBm\n" +
          "bSbcclEMzuM3e9uyaE+iqmax7r6NRCwJzeroxOMeZ7Hfd5Xj4LMWMqV1UWTw3n0C\n" +
          "e2rsOKO4dditrt6Xd/Kx9dxeypCg31cBVNFMYwpF3s8C2Fy/rK5H9Y7O1g5pf24D\n" +
          "olZxkZKtjnBIyGE8WbzceLJ8j/38PJMrujD56laU/Cmcxcmo2ZG5/TIORkxXrU8N\n" +
          "p1tLqAX4MDUewIdaidGvJdwc6ORJYnQ23q3MTF1GlGV49MPAXNGKZJyXEWIgAG2C\n" +
          "RGc0OUU+Ou3sCjCo736SUtwYIi8W/4T1KiMILn2vmxrnzPYaJgZu0TueTgqhcREW\n" +
          "t+cGoPh5WwVQwu9FDE3D\n" +
          "-----END CERTIFICATE-----"));

        */

        console.log(token);


        const options = {
            method: 'GET',
            url: config.base + "/api/v1/person/me",
            headers: {
                authorization:
                  `Bearer ${token}`
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        }
        );

    };

    return <>
        <h1>Api Test</h1>
        <Button onClick={callApi}>Ping API</Button>
    </>
}

const SideBar = () =>{
    const {isAuthenticated, loginWithRedirect, logout, user, getIdTokenClaims, getTokenSilently} = useAuth0();
    function getUserInformation() {
        return isAuthenticated ? [
              {custom: <UserInformationCard key={"user information card"} user={user}/>},
              {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
          ] :
          [{title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}]
    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            {isDivider: true},
            ...getUserInformation(),
            {custom: <h3 key={"nothing works here header"}>Nothing works here.</h3>},
            {isDivider: true},
            {
                title: 'Profile', icon: <PersonIcon/>, onClick: () => {
                    console.log("clicked")
                }
            },
            {
                title: 'Create New Questionnaire', icon: <AddBoxIcon/>, onClick: () => {
                }
            },
            {isDivider: true},
            //{title: 'Test API', icon: <DeveloperBoardIcon/>, onClick: () => {testApi(user);}}
           {custom: <TestApi key={"TestApi"} getTokenSilently={getTokenSilently} getTokenWithPopup={getIdTokenClaims}/>}
        ];
    }
    return <TemporaryDrawer layout={generateLayout(user)}/>
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
            audience={config.audience}
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
                                    <SideBar/>
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
