import React, { useCallback } from 'react'
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Provider, useDispatch } from 'react-redux'
import {REMOVE_ALL, REMOVE_ALL_DATA} from "./features/questions/questionsSlice";
import { SET_UTILITIES } from "./features/utilities/utilitiesSlice";
import {SafeQuestionnaireDialog} from "./SaveQuestionnaireDialog";

function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
        return style;
    }
    return {
        ...style,
        // cannot be 0, but make it super tiny
        transitionDuration: `0.00001s`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        // width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        // width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

export const Sidebar = ({question, items}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [saveQuestionnaireOpen, setSafeQuestionnaireOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [isOpen, setOpenVideo] = React.useState(false);

    const handleClickOpenVideo = useCallback( () => { setOpenVideo(true) }, [], );

    const handleCloseVideo = () => {
        setOpenVideo(false);
    };

    return (
        <Droppable
            renderClone={getRenderItem(items, "")}
            droppableId="SHOP"
            isDropDisabled={true}
        >
            {(provided, snapshot) => (
                <Drawer
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ref={provided.innerRef}
                    variant="permanent"
                    anchor="right"
                >
                    <div className={classes.toolbar}/>
                    <List>
                        {items.map((item, index) => {
                            const shouldRenderClone =
                                item.id === snapshot.draggingFromThisWith;
                            return (
                                <React.Fragment key={item.id}>
                                    {shouldRenderClone ? (
                                        <ListItem button id= {item.label} key={item.label}>
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                style={{textAlign: "left"}}
                                            />
                                        </ListItem>
                                    ) : (
                                        <Draggable draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <ListItem
                                                    id= {item.label}
                                                    key={item.label}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    button
                                                    className={snapshot.isDragging ? "dragging" : ""}
                                                >
                                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                                    <ListItemText primary={item.label}/>
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        {/* {provided.placeholder} */}
                        <div className={classes.toolbar}/>
                        <Divider/>
                         <ListItem
                            button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload(true)
                            }}
                        >
                            <ListItemText primary="delete data"/>
                        </ListItem>

                        <ListItem
                            button
                            id={"eraseQuestionnaire"}
                            onClick={handleClickOpen}
                        >
                            <ListItemText  primary="Erase Questionnaire"/>
                        </ListItem>
                        <ListItem
                            button
                            id={"renderQuestionnaire"}
                            onClick={() => {
                                let x = localStorage.getItem("qmi-data");
                                x = Buffer.from(x).toString("base64");
                                window.open("http://app.u-can-act.nl/questionnaire/interactive?content=" + x);
                            }}
                        >
                            <ListItemText primary="Render Questionnaire"/>
                        </ListItem>

                        <ListItem
                            button
                            id={"saveQuestionnaire"}
                            onClick={() => {setSafeQuestionnaireOpen(true)}}
                        >
                            <ListItemText primary="Save Questionnaire"/>
                        </ListItem>

                        <div>
                            <SafeQuestionnaireDialog open={saveQuestionnaireOpen} setOpen={setSafeQuestionnaireOpen}/>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle
                                    id="alert-dialog-title">{"Do you want to erase questionnaire?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        The questionnaire will be deleted without restoration.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button id={"noToDelete"} onClick={handleClose} color="primary">
                                        No
                                    </Button>
                                    <Button id={"yesToDelete"} onClick={() => {
                                        setOpen(false);
                                        dispatch(SET_UTILITIES({showsMap: {}, hidesMap: {}, saved: {}}));
                                        dispatch(REMOVE_ALL());
                                    }} color="primary" autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>


                    </List>
                </Drawer>
            )}
        </Droppable>
    );
};
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
    const item = items[rubric.source.index];
    const style = {
        ...provided.draggableProps.style
    };
    return (
        <Paper
            className={snapshot.isDragging ? "dragging1" : "not-dragging1"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getStyle(provided.draggableProps.style, snapshot)}
        >
            <ListItem>
                <ListItemIcon style={{color: "white"}}>{item.icon}</ListItemIcon>
                <ListItemText>
                    <Typography variant="body1" style={{color: "white"}}>
                        {item.label}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Paper>
    );
};