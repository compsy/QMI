import React, {useEffect} from 'react'
import {CssBaseline, Grid, makeStyles} from "@material-ui/core";
import {DragDropContext} from "react-beautiful-dnd";
import "../index.css";
import {QUESTION_TYPES} from "../QuestionTypes";
import {QuestionTypesMenu} from "../Molecules/QuestionTypesMenu";
import {QuestionsArea} from "../Organisms/QuestionsArea";
import {JSONTranslationArea} from "../Organisms/JSONTranslationArea";
import {useDispatch, useSelector} from "react-redux";
import { CLEAR_MAPS, initializeMaps } from '../../features/State Management/utilitiesSlice'
import BackToTopArrowButton from "../Atoms/Buttons/BackToTopArrowButton";
import useDrag from '../../customHooks/useDrag'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

const MainPage = () => {
    const questions = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const onDragEnd = useDrag();
    const classes = useStyles();

    useEffect(() => {
        dispatch(initializeMaps(questions))
        return () => dispatch(CLEAR_MAPS())
    }, [])

    return (
        <div data-cy="questionsPage" className={classes.root}>
            <CssBaseline/>
            <DragDropContext onDragEnd={onDragEnd}>
                <QuestionTypesMenu items={QUESTION_TYPES}/>
                <main className={classes.content}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="stretch"
                        style={{
                            margin: "0",
                        }}
                    >
                        <JSONTranslationArea/>
                        <QuestionsArea/>
                        <BackToTopArrowButton/>
                    </Grid>
                </main>
            </DragDropContext>
        </div>
    );
};

export default MainPage;


