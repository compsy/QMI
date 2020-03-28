import React from 'react'
import { useContext } from 'react';
import { QuestionnaireContext } from '../contexts/QuestionnaireContext';
import { Card, Typography } from '@material-ui/core';
import { useEffect } from 'react';

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

export default StringifiedJSONCard;