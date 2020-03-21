import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import CardActions from "@material-ui/core/CardActions";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const QuestionTypeTemplate = ({ question, items, setItems, questionType }) => {
  const options = question.options.map(option => (
    <FormControlLabel disabled label={option} control={questionType.control} />
  ));

  return (
    <Card variant="outlined">
      <CardContent>
        <div className="header">
          <span>
            <Typography variant="h6">{items.indexOf(question)}</Typography>
          </span>
          <span>
            <Typography variant="caption">{question.type}</Typography>
          </span>
        </div>
        <div className="title">
          <Typography variant="h5">{question.title}</Typography>
        </div>
        <div className="options">
          <FormControl>
            <FormGroup>{options}</FormGroup>
          </FormControl>
        </div>
      </CardContent>

      <CardActions>
        <QuestionEditDialog
          question={question}
          items={items}
          setItems={setItems}
        />
        <QuestionRemoveDialog
          question={question}
          items={items}
          setItems={setItems}
        />
      </CardActions>
    </Card>
  );
};

export default QuestionTypeTemplate;

const QuestionEditDialog = ({ question, items, setItems, questionType }) => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newItem = { ...question, title: title };
    const newItems = items.map(item =>
      item.id === newItem.id ? newItem : item
    );
    setItems(newItems);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={() => setOpen(true)}>
        edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>edit this question</DialogTitle>
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
            <Button onClick={handleClose}>cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const QuestionRemoveDialog = ({ question, items, setItems }) => {
  const [open, setOpen] = useState(false);

  const handleRemoveClick = () => {
    const newItems = items.filter(item => item.id !== question.id);
    setItems(newItems);
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" onClick={() => setOpen(true)}>
        remove
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Remove this question?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleRemoveClick}>
            remove
          </Button>
          <Button onClick={() => setOpen(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
