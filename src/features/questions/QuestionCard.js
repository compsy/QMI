import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeQuestionAtIndex } from "./questionsSlice";
import {
  Paper,
  Typography,
  makeStyles,
  IconButton,
  FormControlLabel,
  Checkbox,
  Radio,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
  },
  button: {
    transform: "scale(1)",
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

// if QuestionCard is called,
// the question is guaranteed to exist in state
function QuestionCard({ index }) {
  const question = useSelector((state) => state.questions[index]);
  // const dispatch = useDispatch();
  const classes = useStyles();
  // const [show, setShow] = useState(false);
  return (
    <div key={`question-${index}`}>
      <Paper
        className={classes.paper}
        onClick={(e) => e.stopPropagation()}
        // onMouseEnter={() => setShow(true)}
        // onMouseLeave={() => setShow(false)}
      >
        <div>
          {question.type && (
            <div>
              <Typography variant="caption">{question.type}</Typography>
            </div>
          )}
          {question.section_start && (
            <div>
              <Typography variant="h6">{question.section_start}</Typography>
            </div>
          )}
          {question.title && (
            <div>
              <Typography variant="subtitle1">{question.title}</Typography>
            </div>
          )}
          <div className={classes.options}>
            {question.options.map((opt, i) => (
              <div key={`option-${i}`}>
                <Typography variant="body2">
                  <FormControlLabel
                    label={
                      <Typography variant="body1">
                        {typeof opt === "string" ? opt : opt.title}
                      </Typography>
                    }
                    labelPlacement="end"
                    control={
                      question.type === "checkbox" ? (
                        <Checkbox color="primary" id={`option-${i}`} />
                      ) : (
                        <Radio color="primary" id={`option-${i}`} />
                      )
                    }
                  />
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <EditButtonAndMenu index={index} />
      </Paper>
    </div>
  );
}

export default QuestionCard;

function EditButtonAndMenu({ index }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const handleRemoveClick = () => {
    dispatch(removeQuestionAtIndex(index));
  };
  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.button} size="small" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem button onClick={handleRemoveClick}>
          remove
        </MenuItem>
      </Menu>
    </>
  );
}
