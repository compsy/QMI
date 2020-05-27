import {AppBar, createMuiTheme, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Router, Switch} from "react-router-dom";
import history from "./utils/history";
import GeneralSidebar from "./components/GeneralSidebar";
import {EraseQuestionnaireButton} from "./NavigationBarButtons/EraseQuestionnaireButton";
import {RenderQuestionnaireButton} from "./NavigationBarButtons/RenderQuestionnaireButton";
import {SaveQuestionnaireButton} from "./NavigationBarButtons/SaveQuestionnaireButton";
import Grid from "@material-ui/core/Grid";
import {AntSwitch} from "./AntSwitch";
import React from "react";
import {useDarkMode} from "./useDarkMode";

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

export function NavigationBar() {
    const [theme, toggleDarkMode] = useDarkMode();
    const themeConfig = createMuiTheme(them);
    const classes = useStyles();

    return (
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
                            <AntSwitch data-cy="darkModeSwitcher" mode={themeConfig.palette.type}
                                       onChange={toggleDarkMode} value="checkedC"/>
                        </Grid>

                        <Grid item>Dark Mode</Grid>
                    </Grid>
                </Typography>
                {/*<IconUser/>*/}
            </Toolbar>
        </AppBar>
    );
}