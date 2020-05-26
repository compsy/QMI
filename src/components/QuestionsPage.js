import React, {useEffect} from 'react'
import {CssBaseline, Grid, makeStyles} from "@material-ui/core";
import {DragDropContext} from "react-beautiful-dnd";
import "./index.css";
import {QUESTION_TYPES} from "./QuestionTypes";
import {Sidebar} from "../Sidebar";
import {BottomSection} from "../BottomSection";
import {TopSection} from "../TopSection";
import {useDispatch, useSelector} from "react-redux";
import {CLONE, REORDER, SET_QUESTIONS} from "../features/questions/questionsSlice";
import {SET_UTILITIES} from "../features/utilities/utilitiesSlice";
import ScrollArrow from "../ScrollArrow";
import store from "../app/store";
import uuid from "uuid/v1";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

const QuestionsPage = () => {
    const questions = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const onDragEnd = React.useCallback(result => {
        const {source, destination} = result;
        if (!destination) {
            return;
        }
        switch (source.droppableId) {
            case "BAG":
                // dispatch({ type: "REORDER", source: source, destination: destination });
                dispatch(REORDER({source: source, destination: destination}));
                break;
            case "SHOP":
                // dispatch({ type: "CLONE", source: source, destination: destination });
                dispatch(CLONE({source: source, destination: destination}));
                console.log(destination);
                console.log(questions[destination.index]);
                break;
            default:
                break;
        }
    }, []);
    const classes = useStyles();

    useEffect(() => {
        const x = localStorage.getItem("qmi-data");
        if (x !== null) {
            // dispatch({ type: "SET_QUESTIONS", questions: JSON.parse(x)})
            dispatch(SET_QUESTIONS({questions: JSON.parse(x)}))
        }
        const y = localStorage.getItem("qmi-utilities");
        if (y !== null) {
            dispatch(SET_UTILITIES(JSON.parse(y)));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("qmi-data", JSON.stringify(questions));
        localStorage.setItem("qmi-utilities", JSON.stringify(store.getState().utilities))
    }, [questions]);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Sidebar items={QUESTION_TYPES}/>
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
                        <TopSection/>
                        <BottomSection items={questions}/>

                        <ScrollArrow/>
                    </Grid>
                </main>
            </DragDropContext>
        </div>
    );
};

export default QuestionsPage;


