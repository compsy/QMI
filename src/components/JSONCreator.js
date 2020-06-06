import React from 'react'
import {Card, Typography} from '@material-ui/core';
import {useSelector} from 'react-redux';
import processQuestionnaire from '../utils/ProcessQuestionnaire'


const JSONCreator = () => {
    const questions = useSelector(state => state.questions);

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
            <Typography id={"jsonText"} variant="body2">{JSON.stringify(processQuestionnaire(questions))}</Typography>
        </Card>
    );
};

export default JSONCreator;
