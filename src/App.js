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


const SideBar = () =>{
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    function getUserInformation() {
        return isAuthenticated ? [
              {custom: <UserInformationCard user={user}/>},
              {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: logout}
          ] :
          [{title: 'Log In', icon: <ExitToAppIcon/>, onClick: loginWithRedirect}]
    }

    const generateLayout = () =>{
        return [
            {custom: <Header key={"header"}/>},
            {isDivider: true},
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
            ...getUserInformation()

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
