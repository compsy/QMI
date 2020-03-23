import React, { useContext, useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { QuestionnaireContext } from "../../contexts/QuestionnaireContext";
import TuneIcon from '@material-ui/icons/Tune';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

const actions = [
  { icon: <RadioButtonCheckedIcon />, name: "radio" },
  { icon: <CheckBoxIcon />, name: "checkbox" },
  { icon: <TuneIcon />, name: "range" },
  { icon: <LinearScaleIcon />, name: "likert" },
];

const AddQuestionButton2 = () => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(QuestionnaireContext);

  const handleClick = event => {
    setOpen(false);
    switch (event.currentTarget.id) {
      case 'speeddial-action-0':
        dispatch({ type: "ADD_QUESTION", questionType: "radio" })
        break;
      case 'speeddial-action-1':
        dispatch({ type: "ADD_QUESTION", questionType: "checkbox" })
        break;
      case 'speeddial-action-2':
        dispatch({ type: "ADD_QUESTION", questionType: "range" })
        break;
      case 'speeddial-action-3':
        dispatch({ type: "ADD_QUESTION", questionType: "likert" })
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ margin: "2em 0" }}>
      <SpeedDial
        ariaLabel="speeddial"
        // className={classes.speedDial}
        direction="down"
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default AddQuestionButton2;
