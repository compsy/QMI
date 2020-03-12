import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, FormControl } from '@material-ui/core';


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



const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    // position form in the middle
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    // background: 'grey'
  },
  element: {
    margin: '10px'
  },

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

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [type, setType] = React.useState('radio');

  const handleChange = event => {
    setType(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("title: " + e.target.elements["title"].value);
    handleClose();
  }

  const [title, setTitle] = React.useState("title");

  const handleSave = e => {
    setTitle(title);
    console.log("saved: " + title);
    handleClose();
  }

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={classes.dialog}
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
    </div>
  );
}