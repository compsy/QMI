import React from 'react'
import {Card, Typography} from '@material-ui/core';
import {useSelector} from 'react-redux';

const StringifiedJSONCard = () => {
    // const { questions } = useContext(QuestionnaireContext);
    const questions = useSelector(state => state.questions);
    // formats the ids
    let count = 0;

    const toPrint = () => {
        let toProcess = JSON.parse(JSON.stringify(questions))
        let idMap = {};

        // idMap generation
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].type === "raw") {
                count++;
                idMap = {...idMap, [questions[i].id]: undefined}
                toProcess[i].id = undefined
            } else {
                idMap = {...idMap, [questions[i].id]: `v${i + 1 - count}`}
                toProcess[i].id = `v${i + 1 - count}`
            }
        }
        console.log("idMap: ", idMap);

        for (let i=0; i<toProcess.length; i++) {
            if (toProcess[i].options !== undefined && toProcess[i].options.length > 0) {
                for (let j=0; j<toProcess[i].options.length; j++) {
                    toProcess[i].options[j] = typeof toProcess[i].options[j] === "string" ? toProcess[i].options[j] : {...toProcess[i].options[j], id: undefined};
                    if (toProcess[i].options[j].shows_questions !== undefined && toProcess[i].options[j].shows_questions.length > 0) {
                        for (let k=0; k<toProcess[i].options[j].shows_questions.length; k++) {
                            toProcess[i].options[j].shows_questions[k] = idMap[toProcess[i].options[j].shows_questions[k]]
                        }
                    } else {
                        // toProcess[i].options[j].shows_questions = undefined
                        if (toProcess[i].options[j].shows_questions !== undefined && toProcess[i].options[j].shows_questions.length === 0) {
                            toProcess[i].options[j].shows_questions = undefined
                        }
                    }
                    if (toProcess[i].options[j].hides_questions !== undefined && toProcess[i].options[j].hides_questions.length > 0) {
                        for (let k=0; k<toProcess[i].options[j].hides_questions.length; k++) {
                            toProcess[i].options[j].hides_questions[k] = idMap[toProcess[i].options[j].hides_questions[k]]
                        }
                    } else {
                        // toProcess[i].options[j].hides_questions = undefined
                        if (toProcess[i].options[j].hides_questions !== undefined && toProcess[i].options[j].hides_questions.length === 0) {
                            toProcess[i].options[j].hides_questions = undefined
                        }
                    }
                }
            }
        }
        return toProcess;
    }

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
            <Typography id={"jsonText"} variant="body2">{JSON.stringify(toPrint())}</Typography>
        </Card>
    );
};

export default StringifiedJSONCard;