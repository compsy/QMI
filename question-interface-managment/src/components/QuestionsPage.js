import React, {useContext, useEffect} from "react";
import {v4 as uuidv1} from "uuid";
import {Box, Container, CssBaseline, Grid, makeStyles, Typography} from "@material-ui/core";
import {QuestionnaireContext} from "../contexts/QuestionnaireContext";
import Question from "./Question";
import StringifiedJSONCard from "./StringifiedJSONCard";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import "./index.css";
import {QUESTION_TYPES} from "./QuestionTypes";

import {SettingsContext} from "../contexts/SettingsContext";
import {Sidebar} from "../Sidebar";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #7c4dff 30%, #80deea 90%)',
    padding: theme.spacing(3)
  },
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
        <Sidebar items={QUESTION_TYPES} />
        <main className={classes.content}>
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
      <div>
        <Container
            style={{textAlign: "center", margin: "1em auto", marginTop: "100px"}}
            maxWidth="md"
        >
          {/* <AddQuestionButton /> */}
          {/* <ToggleGridAreasButton /> */}
          <StringifiedJSONCard />
        </Container>
      </div>
  )
};

const BottomSection = ({ items }) => {
  const { settings } = useContext(SettingsContext);
  const { questions } = useContext(QuestionnaireContext);

  return (
    <Container style={{ textAlign: "center" }} maxWidth="md">
      <Typography variant="h4" style={{ margin: "1em 0"}}>
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