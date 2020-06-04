import {AppBar, makeStyles, Toolbar, Typography} from '@material-ui/core'
import {Route, Router, Switch, useLocation} from 'react-router-dom'
import history from '../utils/history'
import GeneralSidebar from './GeneralSidebar'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import QuestionsPage from './QuestionsPage'
import {LandingPage} from './LandingPage/LandingPage'
import {EraseQuestionnaireButton} from '../NavigationBarButtons/EraseQuestionnaireButton'
import {RenderQuestionnaireButton} from '../NavigationBarButtons/RenderQuestionnaireButton'
import {SaveQuestionnaireButton} from '../NavigationBarButtons/SaveQuestionnaireButton'
import UserCard from '../IconUser'

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
    if (location.pathname.includes("home")) return null;

    const elements = [
        <SaveQuestionnaireButton/>,
        <RenderQuestionnaireButton/>,
        <EraseQuestionnaireButton/>
    ];
    return elements.map(element => <Grid item>{element}</Grid>)
}


const AppBarComponent = ({theme, themeConfig, toggleDarkMode}) => {
    const classes = useStyles();

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <AppBar data-cy={theme.palette.type} className={classes.appBar}>
                <Toolbar>
                    <Router history={history}>
                        <GeneralSidebar themeConfig={themeConfig} toggleDarkMode={toggleDarkMode}/>
                        <Switch/>

                        <Grid container alignContent="center" alignItems="center">
                            <Grid item xs={3}>
                                <Grid container alignItems="center" spacing={1}>
                                    <AuxiliaryButtons/>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" className={classes.title}>Questionnaire Interface</Typography>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={2}>
                                <Grid container alignItems="flex-start" justify="flex-end">
                                    <UserCard/>
                                </Grid>
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