import React, { useState } from 'react';
import { List, arrayMove } from 'react-movable';
import { Card, CardContent, FormControlLabel, Typography, Checkbox } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ButtonAppBar from './ButtonAppBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RadioTemplate from './RadioTemplate';
import CheckboxTemplate from './CheckboxTemplate';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  caption: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  con: {
    display: 'flex',
  },
  floatingAdd: {
    postion: 'fixed',
    right: 0,
    bottom: 0
  }
}));

const fabStyle = {
  right: 20,
  position: 'fixed'
};

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  root2: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



const questionTypes = [
  {
    value: 'radio',
    label: 'radio',
  },
  {
    value: 'checkbox',
    label: 'checkbox',
  },
];

function NewEdit({questions}) {

  return (
    <>
      <Container maxWidth="false">
        <ButtonAppBar />
        <ReorderableQuestions questions={questions}/>
        
      </Container>
      <Fab style={{position: 'fixed', bottom: 50, right: 50, zIndex: 999}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <button onClick={() => console.log(JSON.stringify(questions))}>click me</button>
    </>
  );

}

// send questions through props and use that as 
// initial state in useState(init_param) hook
const ReorderableQuestions = (props) => {

  const classes = useStyles();
  const [valuez, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const [items, setItems] = useState(props.questions);

  
  
  const [open, setOpen] = React.useState(false);
  const [updating, setUpdating] = React.useState(null);

  const handleClickOpen = (e, value) => {
    setOpen(true);
    console.log(e.target);
    console.log(value);
    setUpdating(value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [type, setType] = React.useState('radio');

  const handleSubmit = e => {
    e.preventDefault();
    console.log("title: " + e.target.elements["title"].value);
    handleClose();
    const question = updating;
    question.title = title;
    console.log(question);
    setUpdating(null);
    console.log(items);


  }

  const [title, setTitle] = React.useState("title");

  const handleSave = e => {
    setTitle(title);
    console.log("saved: " + title);
    console.log("wwwL: " + e.target.value);
    handleClose();
    const question = updating;
    question.title = title;
    console.log(question);
    setUpdating(null);
    console.log(items);
  }

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }


  const dialog = (
    <Dialog
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit question
        </DialogTitle>
        <DialogContent dividers>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <TextField
                className={classes.element}
                id="type"
                select
                label="Type"
                value={type}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
              >
                {questionTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <FormControl fullWidth>
              <TextField
                className={classes.element}
                id="title"
                label="Title"
                variant="outlined"
                margin="dense"
                autoComplete="off"
                onChange={handleTitleChange}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  )

  return (
    <Container className="main" maxWidth="md">
      <List
        className="drop-container-item"
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{ padding: 0, cursor: isDragged ? "grabbing" : undefined }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li
            {...props}
            style={{
              ...props.style,
              padding: "0 0",
              // padding: "1.5em",
              margin: "1em 0em",
              // margin: "0.5em 0em",
              listStyleType: "none",
              cursor: isDragged ? "grabbing" : "grab",
              textAlign: "center",
            }}
          >
            {(() => {
              switch(value.type) {
                case 'radio':
                  return <RadioTemplate value={value} items={items}/>
                case 'checkbox':
                  return <CheckboxTemplate value={value} items={items}/>
                default:
                  return null;
              }
            })()}
          </li>
        )}
      />
    </Container>
  );
};

export default NewEdit;