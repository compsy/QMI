import React, {useContext} from 'react'
import {QuestionnaireContext} from '../contexts/QuestionnaireContext';
import {Card, Typography} from '@material-ui/core';

const StringifiedJSONCard = () => {
  const { questions } = useContext(QuestionnaireContext);
  // formats the ids
  let count = 0;
  const toPrint = questions.map((question, index) => {
    // subtract cumulative count of raws  
    if (question.type === "raw") {
      count++;
      return {
        ...question,
        id: undefined,
      };
    } else {
      return {
        ...question,
        id: `v${index + 1 - count}`
      }
    }
    // return {
    //     ...question,
    //     id: question.type === "raw" ? undefined : `v${index + 1}`
    // };
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