import React, {Fragment, useState} from "react";
import {
  AppBar, Box, Container,
  createMuiTheme, CssBaseline,
  makeStyles,
  MuiThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import "./background.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { Auth0Provider } from "./components/react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import App, {useDarkMode} from "./App";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {AntSwitch} from "./AntSwitch";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Question from "./components/Question";
import {v4 as uuidv1} from "uuid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ButtonBase from "@material-ui/core/ButtonBase";
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import {Header, TemporaryDrawer} from "./components/TemporaryDrawer";

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
  header:{
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "white"
  }
}));



const alignInGrid = (spacing, ...renderedComponents) => {
  return <Grid container direction="row" alignItems="center" spacing={spacing}>
    {renderedComponents.map((component, index) =>(
      <Grid key={index} item>
        {component}
      </Grid>))}
  </Grid>
}

// This needs to get its own .js file, but I did not know where to put it.
const QuestionnaireView = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex"
    },

    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    card: {
      height:"100%"
    },
    titleBar: {
      background:'#27496d'
    },
    tile: {
    }
  }));

  // This is merely for debugging and emulation. An actual reference to the questionnaires need to be thought of.
  const [current, setCurrent] = useState(0);

  // Using a GridList to view questionnaires.
  const QuestionnaireList = () => {
    const ActionIcon = ({value}) =>{
      return alignInGrid(0,
        <IconButton onClick={() => setCurrent(value)}><InfoIcon/></IconButton>,
        <IconButton onClick={() => {console.log("Questionnaire " + value + " will be edited.")}}><EditIcon/></IconButton>
        );
    }

    return <GridList cols={4} spacing={10}>
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(value => {
        return <GridListTile key={value} className={classes.tile}>
          <img src="logo512.png" alt=""/>
          <GridListTileBar className={classes.titleBar}
                           title={"Questionnaire " + value}
                           actionIcon={<ActionIcon value={value}/>}/>
        </GridListTile>
      })}
    </GridList>
  }

  // Using Card instances to view the questionnaires.
  const QuestionnaireListOld = () => {
    return <Grid
      container
      direction="row"
      justify="center"
      alignItems="baseline"
      spacing={6}
    >
      {[1, 2, 3].map((value) => (
        <Grid key={value} item>
          <Card>
            <CardActionArea onClick={() => console.log("card clicked: " + value)}>
              <CardMedia
                component="img"
                alt="Questionnaire Preview"
                image="logo192.png"
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  Questionnaire {value}
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>
        </Grid>
      ))}
    </Grid>
  }

  const QuestionnaireDetails = ({current}) =>{
    const Wrapper = ({title, subtitle, extra, editAvailable = false}) =>{
      return  <Card className={classes.card}>
        <CardContent>
          {alignInGrid(1, <InfoIcon/>, <Typography color="textSecondary" gutterBottom>Questionnaire details</Typography>)}
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography color="textSecondary">
            {subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {extra}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disabled={!editAvailable} color="primary">Edit Questionnaire</Button>
        </CardActions>
      </Card>
    }
    if(current === 0){
      return <Wrapper
        title={"No questionnaire is selected."}
        subtitle={"Please click one of those listed on the left to view details."}
        extra={""}
      />
    }
    return <Wrapper
      title={"Questionnaire " + current}
      subtitle={"x questions"}
      extra={"This has not yet been configured."}
      editAvailable
    />
  }


  const classes = useStyles();
  return <Grid container spacing={10} style={{padding: 100}}>
    <Grid item xs={8}>
      <QuestionnaireList/>
    </Grid>
    <Grid item xs={4}>
      <QuestionnaireDetails current={current}/>
    </Grid>
  </Grid>
}



function LandingApp() {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);
  const classes = useStyles();



  const layout = [
    {custom:<Header key={"header"}/>},
    {isDivider: true},
    {custom:<h3>Nothing works here.</h3>},
    {isDivider: true},
    {title: 'Profile', icon: <PersonIcon/>, onClick: () =>{console.log("clicked")}},
    {title: 'Create New Questionnaire', icon: <AddBoxIcon/>, onClick: () =>{}},
    {isDivider: true},
    {title: 'Log Out', icon: <ExitToAppIcon/>, onClick: () =>{}},
    {isDivider: true},
    {title: 'Edit Dialog Beta', icon: <DeveloperBoardIcon/>, onClick: () => {}}
  ];
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              {props.children}
            </div>
          </MuiThemeProvider>
        </div></Provider></Auth0Provider>

  }
  return (
      <MainWrapper>
        <AppBar className={classes.appBar} justify="space-between">
          <Toolbar>
            <TemporaryDrawer layout={layout}/>
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
