import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import QuestionsList from './components/QuestionsList'
import { v4 as uuidv1 } from 'uuid'
import { useSelector } from 'react-redux'

export const QuestionsArea = () => {
    const questions = useSelector(state => state.questions)

    return (
        <Container style={{ textAlign: 'center' }} maxWidth="md">
            <Typography variant="h4" style={{ margin: '1em 0' }}>
                Questions
            </Typography>
            <Droppable droppableId="BAG" style={{ textAlign: 'center' }}>
                {(provided) => (
                    <Box ref={provided.innerRef} id={'dropzone'} className="shopping-bag">
                        {questions.map((question, index) => (
                            <QuestionsList index={index} key={uuidv1()} question={question}/>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Container>
    );
};
