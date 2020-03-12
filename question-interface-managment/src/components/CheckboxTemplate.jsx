import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'

const CheckboxEditDialog = ({value, items, setItems}) => {

  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setTitle('');
    setOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {...value, title: title};
    const newItems = items.map(item => (item.id == newItem.id ? newItem : item));
    setItems(newItems);
    handleClose();
  }

  return (
    <div>
      <Button color="primary" onClick={() => setOpen(true)}>
        edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            edit this question
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              edit this question and when done press save or cancel
            </DialogContentText>
            <TextField
              autoComplete="off"
              value={title}
              onChange={event => setTitle(event.currentTarget.value)}
              autoFocus
              variant="outlined"
              margin="dense"
              id="title"
              label="title"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              save
            </Button>
            <Button onClick={handleClose}>
              cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}


const CheckboxRemoveDialog = ({value, items, setItems}) => {

  const [open, setOpen] = useState(false);

  const handleRemoveClick = (event) => {
    const newItems = items.filter(item => item.id != value.id);
    setItems(newItems);
    setOpen(false);
  }

  return (
    <div>
      <Button color="secondary" onClick={() => setOpen(true)}>
        remove
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Remove Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove this question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleRemoveClick}>
            remove
          </Button>
          <Button onClick={() => setOpen(false)}>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


const CheckboxTemplate = ({ value, items, setItems }) => {
  const options = value.options.map(option =>
    <FormControlLabel
      disabled
      label={option}
      control={<Checkbox />}
    />
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <div className="header">
          <span>
            <Typography variant="h6">
              {items.indexOf(value)}
            </Typography>
          </span>
          <span>
            <Typography variant="caption">
              {value.type}
            </Typography>
          </span>
        </div>
        <div className="title">
          <Typography variant="h5">
						{value.title}
					</Typography>
        </div>
        <div className="options">
          <FormControl component="fieldset">
            <FormGroup>
              {options}
            </FormGroup>
          </FormControl>
        </div>
      </CardContent>
      <CardActions>
        <CheckboxEditDialog value={value} items={items} setItems={setItems} />
        <CheckboxRemoveDialog value={value} items={items} setItems={setItems} />
      </CardActions>
    </Card>
  )
}

export default CheckboxTemplate;