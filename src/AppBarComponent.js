import { AppBar, makeStyles, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core'
import {Route, Router, Switch, useLocation} from 'react-router-dom'
import history from './utils/history'
import GeneralSidebar from './components/GeneralSidebar'
import Grid from '@material-ui/core/Grid'
import { AntSwitch } from './AntSwitch'
import React from 'react'
import QuestionsPage from './components/QuestionsPage'
import { LandingPage } from './components/LandingPage/LandingPage'
import { EraseQuestionnaireButton } from './NavigationBarButtons/EraseQuestionnaireButton'
import { RenderQuestionnaireButton } from './NavigationBarButtons/RenderQuestionnaireButton'
import { SaveQuestionnaireButton } from './NavigationBarButtons/SaveQuestionnaireButton'
import IconUser from './IconUser'

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

const AuxiliaryButtons = () => {
    const location = useLocation();
    if(location.pathname.includes("home")) return null;

    return [
        <EraseQuestionnaireButton/>,
        <RenderQuestionnaireButton/>,
        <SaveQuestionnaireButton/>
    ];
}

const AppBarComponent = ({themeConfig, toggleDarkMode}) => {
    const classes = useStyles();

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Router history={history}>
                        <GeneralSidebar themeConfig={themeConfig} toggleDarkMode={toggleDarkMode}/>
                        <Switch/>

                    <Grid container alignContent="center" alignItems="center">
                        <Grid item xs={3} wrap="nowrap"><AuxiliaryButtons/></Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.title}>Questionnaire Interface</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <IconUser/>
                        </Grid>

                    </Grid>
                    </Router>

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
    );
}

export default AppBarComponent;