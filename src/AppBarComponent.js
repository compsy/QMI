import { AppBar, makeStyles, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core'
import { Route, Router, Switch } from 'react-router-dom'
import history from './utils/history'
import GeneralSidebar from './components/GeneralSidebar'
import Grid from '@material-ui/core/Grid'
import { AntSwitch } from './AntSwitch'
import React from 'react'
import QuestionsPage from './components/QuestionsPage'
import { LandingPage } from './components/LandingPage/LandingPage'

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


const AppBarComponent = ({themeConfig, toggleDarkMode}) => {
    const classes = useStyles();
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Router history={history}>
                        <GeneralSidebar/>
                        <Switch/>
                    </Router>
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