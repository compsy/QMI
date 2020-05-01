import React, {useContext} from "react";
import {SettingsContext} from "./contexts/SettingsContext";
import {QuestionnaireContext} from "./contexts/QuestionnaireContext";
import {Box, Container, Typography} from "@material-ui/core";
import {Droppable} from "react-beautiful-dnd";
import Question from "./components/Question";
import {v4 as uuidv1} from "uuid";

export const BottomSection = ({items}) => {
    const {settings} = useContext(SettingsContext);
    const {questions} = useContext(QuestionnaireContext);

    return (
        <Container style={{textAlign: "center"}} maxWidth="md">
            <Typography variant="h4" style={{margin: "1em 0"}}>
                Questions
            </Typography>
            <Droppable droppableId="BAG" style={{textAlign: "center"}}>
                {(provided, snapshot) => (
                    <Box ref={provided.innerRef} className="shopping-bag">
                        {questions.map((question, index) => (
                            <Question index={index} key={uuidv1()} question={question}/>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
            {/* <AddQuestionButton2 /> */}
        </Container>
    );
};
