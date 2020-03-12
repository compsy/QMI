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
    </>
  );

}

// send questions through props and use that as 
// initial state in useState(init_param) hook
const ReorderableQuestions = (props) => {
 
  const [items, setItems] = useState(props.questions);

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
                  return <RadioTemplate value={value} items={items} setItems={setItems}/>
                case 'checkbox':
                  return <CheckboxTemplate value={value} items={items} setItems={setItems}/>
                default:
                  return null;
              }
            })()}
          </li>
        )}
      />
      <button onClick={() => console.log(JSON.stringify(items))}>click me</button>
    </Container>
    
  );
};

export default NewEdit;