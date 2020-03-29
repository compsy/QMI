import React, { useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ExpansionPanelSummary,
  Grid,
  Paper
} from "@material-ui/core";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import Question from "./Question";
import ToggleGridAreasButton from "./buttons/ToggleGridAreasButton";
import AddQuestionButton2 from "./buttons/AddQuestionButton2";
import StringifiedJSONCard from "./StringifiedJSONCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { QUESTION_TYPES } from "./QuestionTypes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./index.css";

const QuestionsPage = () => {
  const { questions, dispatch } = useContext(QuestionnaireContext);
  const onDragEnd = React.useCallback(result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case "BAG":
        dispatch({ type: "REORDER", source: source, destination: destination });
        break;
      case "SHOP":
        dispatch({ type: "CLONE", source: source, destination: destination });
        break;
      default:
        break;
    }
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Toolbar items={QUESTION_TYPES} />
      <Container maxWidth="sm">
        <TopSection />
        <BottomSection items={questions} />
      </Container>
    </DragDropContext>
  );
};

export default QuestionsPage;

const TopSection = () => {
  return (
    <Container style={{ textAlign: "center", margin: "2em auto" }}>
      {/* <AddQuestionButton /> */}
      <ToggleGridAreasButton />
      <StringifiedJSONCard />
    </Container>
  );
};

const BottomSection = ({ items }) => {
  const { questions } = useContext(QuestionnaireContext);

  return (
    <Container style={{ textAlign: "center", margin: "1em auto" }}>
      <Typography variant="h4" style={{ margin: "1em 0" }}>
        Questions
      </Typography>
      <Droppable droppableId="BAG">
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
      <AddQuestionButton2 />
    </Container>
  );
};

// This method is needed for rendering clones of draggables
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={provided.draggableProps.style}
      // className={snapshot.isDragging ? "dragging" : ""}
    >
      <Grid container direction="column">
        <Grid item xs justify="center" alignItems="stretch" style={{textAlign:"center"}}>
          <Paper>
            <Typography variant="h5">{`new ${item.label}`}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const Toolbar = ({ items }) => {
  return (
    <Droppable
      renderClone={getRenderItem(items, "")}
      droppableId="SHOP"
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <Drawer
          ref={provided.innerRef}
          style={{ width: 50 }}
          variant="permanent"
          anchor="right"
        >
          <List>
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
                        <div
                          key={item.label}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem
                            button
                            className={snapshot.isDragging ? "dragging" : ""}
                          >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  )}
                </React.Fragment>
              );
            })}
            {provided.placeholder}
          </List>
        </Drawer>
      )}
    </Droppable>
  );
};
