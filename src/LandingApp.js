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
import IconButton from "@material-ui/core/IconButton";
import "./background.css";
import {Provider} from "react-redux";
import store from "./app/store";
import {Auth0Provider} from "./components/react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import {useDarkMode} from "./App";
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import {Header, TemporaryDrawer} from "./components/TemporaryDrawer";
import GeneralSidebar from "./components/GeneralSidebar";
import {QuestionnaireView} from "./components/LandingPage/QuestionnaireView";

/***
 *
 *
 * Color palette used:
 * https://colorhunt.co/palette/180289
 *
 *
 * ***/

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
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
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
                    <Typography component="div">
                        <i>Logged in as: ...</i>
                    </Typography>
                </Toolbar>

            </AppBar>
            <CssBaseline/>
            <QuestionnaireView/>
        </MainWrapper>

    );
}

export default LandingApp;
