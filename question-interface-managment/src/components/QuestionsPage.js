import React, {useContext, useEffect} from "react";
import {v4 as uuidv1} from "uuid";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import Question from "./Question";
import StringifiedJSONCard from "./StringifiedJSONCard";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import "./index.css";
import {QUESTION_TYPES} from "./QuestionTypes";

import {SettingsContext} from "../contexts/SettingsContext";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  // appBar: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginRight: drawerWidth,
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
    alignItems: "center",
    background: 'linear-gradient(45deg, #7c4dff 30%, #80deea 90%)',
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    // width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: 'linear-gradient(45deg, #7c4dff 30%, #80deea 90%)',
    padding: theme.spacing(3)
  }
}));

const QuestionsPage = () => {
  const { settings, settingsDispatch } = useContext(SettingsContext);
  const { questions, dispatch } = useContext(QuestionnaireContext);
  const onDragEnd = React.useCallback(result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    settingsDispatch({
      type: "SET_DESTINATION_INDEX",
      destinationIndex: destination.index
    });
    console.log(settings.destinationIndex, destination.index);
    switch (source.droppableId) {
      case "BAG":
        dispatch({ type: "REORDER", source: source, destination: destination });
        break;
      case "SHOP":
        dispatch({ type: "CLONE", source: source, destination: destination });
        console.log(destination);
        console.log(questions[destination.index]);
        break;
      default:
        break;
    }
  }, []);
  const classes = useStyles();
  useEffect(() => {
    const x = localStorage.getItem("qmi-data");
    if (x !== null) {
      dispatch({ type: "SET_QUESTIONS", questions: JSON.parse(x)})
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("qmi-data", JSON.stringify(questions))
  }, [questions]);

  return (
    <div className={classes.root} >
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" noWrap>
              Questionnaire Editor
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar items={QUESTION_TYPES} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={{
              margin: "0",
              background: settings.showGridAreas ? "lightgrey" : "transparent"
            }}
          >
            {/* <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={6}
                style={{
                  background: settings.showGridAreas
                    ? "lightblue"
                    : "transparent"
                }}
              >
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  background: settings.showGridAreas
                  ? "lightgreen"
                  : "transparent"
                }}
              >
              </Grid>
            </Grid> */}
            <TopSection />
            <BottomSection items={questions} />
          </Grid>
        </main>
      </DragDropContext>
    </div>
  );
};

export default QuestionsPage;

const TopSection = () => {
  return (
    <Container
      style={{ textAlign: "center", margin: "1em auto" }}
      maxWidth="md"
    >
      {/* <AddQuestionButton /> */}
      {/* <ToggleGridAreasButton /> */}
      <StringifiedJSONCard />
    </Container>
  );
};

const BottomSection = ({ items }) => {
  const { settings } = useContext(SettingsContext);
  const { questions } = useContext(QuestionnaireContext);

  return (
    <Container style={{ textAlign: "center" }} maxWidth="md">
      <Typography variant="h4" style={{ margin: "1em 0" }}>
        Questions
      </Typography>
      <Droppable droppableId="BAG" style={{ textAlign: "center" }}>
        {(provided, snapshot) => (
          <Box ref={provided.innerRef} className="shopping-bag">
            {questions.map((question, index) => (
              <Question index={index} key={uuidv1()} question={question} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      {/* <AddQuestionButton2 /> */}
    </Container>
  );
};

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.00001s`
  };
}

// This method is needed for rendering clones of draggables
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  const style = {
    //backgroundColor: snapshot.isDragging ? 'blue' : 'white',
    // fontSize: 18,
    ...provided.draggableProps.style
  };
  return (
    <Paper
      className={snapshot.isDragging ? "dragging1" : "not-dragging1"}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      // style={provided.draggableProps.style}
      style={getStyle(provided.draggableProps.style, snapshot)}
      // style={{ padding: "1em", color: "white" }}
    >
      <ListItem>
        <ListItemIcon style={{ color: "white" }}>{item.icon}</ListItemIcon>
        <ListItemText>
          <Typography variant="body1" style={{ color: "white" }}>
            {item.label}
          </Typography>
        </ListItemText>
      </ListItem>
    </Paper>
  );
};

const Sidebar = ({ question, items }) => {
  const { dispatch } = useContext(QuestionnaireContext);
  const { settings, settingsDispatch } = useContext(SettingsContext);
  const classes = useStyles();

  return (
    <Droppable
      renderClone={getRenderItem(items, "")}
      droppableId="SHOP"
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ref={provided.innerRef}
          variant="permanent"
          anchor="right"
        >
          <div className={classes.toolbar} />
          <List
            style={{
              background: settings.showGridAreas ? "lightgrey" : "transparent"
            }}
          >
            {items.map((item, index) => {
              const shouldRenderClone =
                item.id === snapshot.draggingFromThisWith;
              return (
                <React.Fragment key={item.id}>
                  {shouldRenderClone ? (
                    <ListItem button key={item.label}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        style={{ textAlign: "left" }}
                      />
                    </ListItem>
                  ) : (
                    <Draggable draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          key={item.label}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          button
                          className={snapshot.isDragging ? "dragging" : ""}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItem>
                      )}
                    </Draggable>
                  )}
                </React.Fragment>
              );
            })}
            {/* {provided.placeholder} */}
            <div className={classes.toolbar} />
            <Divider />
            <ListItem
              button
              onClick={() => settingsDispatch({ type: "TOGGLE_GRID_AREAS" })}
            >
              <ListItemText primary="toggle grid areas" />
            </ListItem>
            <ListItem
              button
              onClick={() => {localStorage.clear();
                          window.location.reload(true)}}
              >
              <ListItemText primary="delete data"/>
            </ListItem>

            <ListItem
                button

                onClick={() => {
                  dispatch({ type: "REMOVE_ALL"});
                }}
            >
              <ListItemText primary="erase questionnaire" />
            </ListItem>


          </List>
        </Drawer>
      )}
    </Droppable>
  );
};

// const [questions, dispatch] = useReducer(questionnaireReducer, [
//   {id: 'v1', type: "range", title: "Hello BOI", labels: ["option 1", "option 222", "option 3", "option 4"]},
//   {id: 'v12', type: "radio", title: "Hello Kitty", options: ["option 1", "option 222", "option 3", "option 4"]},
//   {id: 'v2', type: "checkbox", title: "untitled checkbox", options: ["option 1", "option 2", "option 3", "option 4"]},
//
// ]);