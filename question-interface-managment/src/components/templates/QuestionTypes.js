

/*
* An enum for defining question types. Every question type should be referenced from here, and every custom
* configuration template (e.g. <Radio/> in case of RADIO) should be given here.
* */
import {Radio, Checkbox} from "@material-ui/core";

const QuestionTypes = {
  CHECKBOX: {
    control: Checkbox
  },
  RADIO: {
    control: Radio
  },
  // add more
};

export default QuestionTypes;