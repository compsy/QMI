import React, { useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import {
  makeStyles,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  CssBaseline,
  Divider
} from "@material-ui/core";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import Question from "./Question";
import ToggleGridAreasButton from "./buttons/ToggleGridAreasButton";
import AddQuestionButton2 from "./buttons/AddQuestionButton2";
import StringifiedJSONCard from "./StringifiedJSONCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { QUESTION_TYPES } from "./QuestionTypes";

import "./index.css";
import { SettingsContext } from "../contexts/SettingsContext";
import { useState } from "react";
import { useEffect } from "react";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  // appBar: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginRight: drawerWidth,
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
    alignItems: 'center',
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
    backgroundColor: theme.palette.background.default,
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
    settingsDispatch({ type: "SET_DESTINATION_INDEX", destinationIndex: destination.index});
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

  return (
    <div className={classes.root}>
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
    <Container style={{ textAlign: "center", margin: "1em auto" }} maxWidth="md">
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
    <Container style={{ textAlign: "center"}} maxWidth="md">
      <Typography variant="h4" style={{ margin: "1em 0" }}>
        Questions
      </Typography>
      <Droppable droppableId="BAG" style={{ textAlign: "center" }}>
        {(provided, snapshot) => (
          <Box ref={provided.innerRef} className="shopping-bag">
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    <Question key={uuidv1()} question={question} />
                  </div>
                )}
              </Draggable>
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
    transitionDuration: `0.00001s`,
  };
}

// This method is needed for rendering clones of draggables
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  const style = {
    //backgroundColor: snapshot.isDragging ? 'blue' : 'white',
    // fontSize: 18,
    ...provided.draggableProps.style,
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

const Sidebar = ({ items }) => {
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
                <React.Fragment style={{ textAlign: "left" }} key={item.id}>
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
            <Divider/>
            <ListItem button onClick={() => settingsDispatch({ type: "TOGGLE_GRID_AREAS" })}>
              <ListItemText primary="toggle grid areas" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </Droppable>
  );
};
