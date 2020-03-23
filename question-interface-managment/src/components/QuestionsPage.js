import React, { useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import { Container, Card, Typography } from "@material-ui/core";
import { QuestionnaireContext } from "../contexts/QuestionnaireContext";
import Question from "./Question";
import AddQuestionButton from "./buttons/AddQuestionButton";
import ToggleGridAreasButton from "./buttons/ToggleGridAreasButton";
import AddQuestionButton2 from "./buttons/AddQuestionButton2";

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
      <AddQuestionButton />
      <ToggleGridAreasButton />
      <StringifiedJSONCard />
    </Container>
  );
};

const StringifiedJSONCard = () => {
  const { questions } = useContext(QuestionnaireContext);
  // formats the ids
  const toPrint = questions.map((question, index) => {
    const obj =
      question.type === "range"
        ? {
            id: `v${index + 1}`,
            type: question.type,
            title: question.title,
            labels: question.options
          }
        : {
            ...question,
            id: `v${index + 1}`
          };
    return obj;
  });
  return (
    <Card
      variant="outlined"
      style={{
        wordWrap: "break-word",
        wordBreak: "break-word",
        margin: "0.5em auto",
        padding: "2em",
        height: "150px",
        overflow: "scroll"
      }}
    >
      <Typography variant="body2">{JSON.stringify(toPrint)}</Typography>
    </Card>
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
