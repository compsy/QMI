import React, { useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import { Container, Typography } from "@material-ui/core";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import Question from "./Question";
import AddQuestionButton from "./buttons/AddQuestionButton";
import ToggleGridAreasButton from "./buttons/ToggleGridAreasButton";
import AddQuestionButton2 from "./buttons/AddQuestionButton2";
import StringifiedJSONCard from "./StringifiedJSONCard";

const QuestionsPage = () => {
  return (
    <Container maxWidth="sm">
      <TopSection />
      <BottomSection />
    </Container>
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

const BottomSection = () => {
  const { questions } = useContext(QuestionnaireContext);

  return (
    <Container style={{ textAlign: "center", margin: "1em auto" }}>
      <Typography variant="h4" style={{ margin: "1em 0" }}>
        Questions
      </Typography>
      {questions.map(question => (
        <Question key={uuidv1()} question={question} />
      ))}
      <AddQuestionButton2 />
    </Container>
  );
};
