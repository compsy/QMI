import React, {useContext, useState} from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {QuestionnaireContext} from "../../contexts/QuestionnaireContext";
import TuneIcon from '@material-ui/icons/Tune';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import Looks5TwoToneIcon from '@material-ui/icons/Looks5TwoTone';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ViewListIcon from '@material-ui/icons/ViewList';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import GestureIcon from '@material-ui/icons/Gesture';
import Crop54Icon from '@material-ui/icons/Crop54';

const actions = [
  { icon: <RadioButtonCheckedIcon />, name: "radio" },
  { icon: <CheckBoxIcon />, name: "checkbox" },
  { icon: <TuneIcon />, name: "range" },
  { icon: <LinearScaleIcon />, name: "likert" },
  { icon: <ViewListIcon />, name: "select" },
  { icon: <TextFieldsIcon />, name: "textarea" },
  { icon: <Looks5TwoToneIcon />, name: "number"},
  { icon: <DateRangeIcon />, name: "date"},
  { icon: <ScheduleIcon />, name: "time"},
  { icon: <TextFormatIcon />, name: "textfield"},
  { icon: <GestureIcon />, name: "draw"},
  { icon: <Crop54Icon />, name: "raw"},
];

const AddQuestionButton2 = () => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(QuestionnaireContext);

  const handleClick = event => {
    setOpen(false);
    switch (event.currentTarget.id) {
      case 'speeddial-action-0':
        dispatch({ type: "ADD_QUESTION", questionType: "radio" });
        break;
      case 'speeddial-action-1':
        dispatch({ type: "ADD_QUESTION", questionType: "checkbox" });
        break;
      case 'speeddial-action-2':
        dispatch({ type: "ADD_QUESTION", questionType: "range" });
        break;
      case 'speeddial-action-3':
        dispatch({ type: "ADD_QUESTION", questionType: "likert" });
        break;
      case 'speeddial-action-4':
        dispatch({ type: "ADD_QUESTION", questionType: "select" });
        break;
      case 'speeddial-action-5':
        dispatch({ type: "ADD_QUESTION", questionType: "textarea" });
        break;
      case 'speeddial-action-6':
        dispatch({ type: "ADD_QUESTION", questionType: "number" });
        break;
      case 'speeddial-action-7':
        dispatch({ type: "ADD_QUESTION", questionType: "date" });
        break;
      case 'speeddial-action-8':
        dispatch({ type: "ADD_QUESTION", questionType: "time" });
        break;
      case 'speeddial-action-9':
        dispatch({ type: "ADD_QUESTION", questionType: "textfield" });
        break;
      case 'speeddial-action-10':
        dispatch({ type: "ADD_QUESTION", questionType: "draw" });
        break;
      case 'speeddial-action-11':
        dispatch({ type: "ADD_QUESTION", questionType: "raw" });
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
