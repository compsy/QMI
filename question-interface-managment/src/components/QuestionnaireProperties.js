import React, {useContext, useState} from "react";
import Switch from "@material-ui/core/Switch";
import {DialogContent, FormControlLabel, IconButton, InputAdornment} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import uuid from "uuid/v1";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const PatternProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Regex pattern"}
    propertyName={"pattern"}
    {...props}
  />
);

const RegexpProperty = ({
                        newQuestion,
                        newQuestionDispatch,
                        name,
                        propertyName,
                        regexp,
                        helperText,
                        ...props
                      }) => {

  const [valid, setValid] = useState(true);

  const handleChange = event => {
    newQuestion[propertyName] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion }
    });
    setValid(regexp.test(event.target.value));
  };

  return (
    <TextField
      key={uuid()}
      error={!valid}
      autoFocus
      variant="outlined"
      margin="dense"
      type="text"
      fullWidth
      id={"outlined-error-helper-text"}
      helperText={valid ? "" : helperText}
      value={newQuestion[propertyName]}
      onChange={handleChange}
      label={name}
      {...props}
    />
  );
};
// todo: implement check
export const ColorProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <RegexpProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Color (hex value)"}
    propertyName={"color"}
    regexp={RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")}
    helperText="Use hex colors only (e.g. #007fff, #03d)"
    {...props}
  />
);


const DateProperty = ({
                        newQuestion,
                        newQuestionDispatch,
                        name,
                        propertyName,
                        ...props
                      }) => {

  const handleChange = event => {
    newQuestion[propertyName] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion }
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        key={uuid()}
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={name}
        value={newQuestion[propertyName]}
        onChange={handleChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>

  );
};

export const DefaultDateProperty = ({newQuestion, newQuestionDispatch, ...props}) =>
  <DateProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name="Default Date"
    propertyName="default_date"
    {...props}
  />;

export const MinDateProperty = ({newQuestion, newQuestionDispatch, ...props}) =>
  <DateProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name="Minimum Date"
    propertyName="min"
    {...props}
  />;

export const MaxDateProperty = ({newQuestion, newQuestionDispatch, ...props}) =>
  <DateProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name="Maximum Date"
    propertyName="max"
    {...props}
  />;



const TextProperty = ({
  newQuestion,
  newQuestionDispatch,
  name,
  propertyName,
  ...props
}) => {

  const handleChange = event => {
    newQuestion[propertyName] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion }
    });
  };

  return (
    <TextField
      key={uuid()}
      autoFocus
      variant="outlined"
      margin="dense"
      type="text"
      fullWidth
      id={"outlined-basic"}
      value={newQuestion[propertyName]}
      onChange={handleChange}
      label={name}
      {...props}
    />
  );
};

export const TitleProperty = ({ newQuestion, newQuestionDispatch, ...props }) => {
  return (
    <TextProperty
      newQuestion={newQuestion}
      newQuestionDispatch={newQuestionDispatch}
      propertyName={"title"}
      name={"Title"}
      {...props}
    />
  );
}

export const TooltipProperty = ({ newQuestion, newQuestionDispatch, ...props }) => {
  return (
    <TextProperty
      newQuestion={newQuestion}
      newQuestionDispatch={newQuestionDispatch}
      propertyName={"tooltip"}
      name={"Tooltip text"}
      {...props}
    />
  );
}

export const OtherwiseLabelProperty = ({ newQuestion, newQuestionDispatch, ...props }) => {
  return (
    <TextProperty
      newQuestion={newQuestion}
      newQuestionDispatch={newQuestionDispatch}
      propertyName={"otherwise_label"}
      name={"Custom 'otherwise: ...' text"}
      {...props}
    />
  );

}
export const OtherwiseTooltipProperty = ({ newQuestion, newQuestionDispatch, ...props }) => {
  return (
    <TextProperty
      newQuestion={newQuestion}
      newQuestionDispatch={newQuestionDispatch}
      propertyName={"otherwise_tooltip"}
      name={"'otherwise: ...' tooltip"}
      {...props}
    />
  );
}




export const HiddenProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestionDispatch={newQuestionDispatch}
    newQuestion={newQuestion}
    name={"Hidden"}
    propertyName={"hidden"}
    {...props}
  />
)

export const ShowOtherwiseProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestionDispatch={newQuestionDispatch}
    newQuestion={newQuestion}
    name={"Show 'otherwise: ...'"}
    propertyName={"show_otherwise"}
    {...props}
  />
)

export const RequiredProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestionDispatch={newQuestionDispatch}
    newQuestion={newQuestion}
    name={"Required"}
    propertyName={"required"}
    {...props}
  />
)


const BooleanProperty = ({newQuestion, newQuestionDispatch,
                           name,
                           propertyName,
                           ...props}) => {

  const handleChange = event => {
    newQuestion[propertyName] = event.target.checked;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion }
    });
  };

  const switchComponent = <Switch
    checked={newQuestion[propertyName]}
    color="primary"
    onChange={handleChange}
    name={propertyName}
  />;


  return (
    <FormControlLabel
      control={switchComponent}
      label={name}
      {...props}
    />
  );
};


// TODO: make it allow numbers only
const NumericProperty = ({
                                newQuestion,
                                newQuestionDispatch,
                                name,
                                propertyName,
                                ...props
                              }) => {
  return <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={name}
    propertyName={propertyName}
    {...props}
  />
};

export const MinProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Minimum"}
    propertyName={"min"}
    {...props}
  />
);

export const MaxProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Maximum"}
    propertyName={"max"}
    {...props}
  />
);

export const StepProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Step size"}
    propertyName={"step"}
    {...props}
  />
);

export const ContentProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    multiline
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Raw HTML"}
    propertyName={"raw"}
    {...props}
  />
);

export const PlaceholderProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Placeholder"}
    propertyName={"placeholder"}
    {...props}
  />
);

export const DefaultTextValueProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Default value"}
    propertyName={"default_value"}
    {...props}
  />
);




export const HintProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Hint"}
    propertyName={"hint"}
    {...props}
  />
);

export const MaxLengthProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Max length"}
    propertyName={"max_length"}
    {...props}
  />
);

export const RemoveButtonLabelProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Remove-button label"}
    propertyName={"remove_button_label"}
    {...props}
  />
);

export const AddButtonLabelProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Add-button label"}
    propertyName={"add_button_label"}
    {...props}
  />
);
export const DefaultExpansionsProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Default amount of expansions"}
    propertyName={"default_expansions"}
    {...props}
  />
);
export const MaxExpansionsProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Default amount of expansions"}
    propertyName={"max_expansions"}
    {...props}
  />
);

export const HoursFromProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Hours from"}
    propertyName={"hours_from"}
    {...props}
  />
);

export const HoursToProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Hours to"}
    propertyName={"hours_to"}
    {...props}
  />
);

export const HoursStepProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Hours step count"}
    propertyName={"hours_step"}
    {...props}
  />
);

export const HoursLabelProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Custom 'hours' text"}
    propertyName={"hours_label"}
    {...props}
  />
);
export const MinutesLabelProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Custom 'minutes' label"}
    propertyName={"minutes_label"}
    {...props}
  />
);

export const ButtonTextProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Button text"}
    propertyName={"button_text"}
    {...props}
  />
);

export const LabelProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Label"}
    propertyName={"label"}
    {...props}
  />
);

export const WidthProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Width"}
    propertyName={"width"}
    {...props}
  />
);
export const HeightProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Height"}
    propertyName={"height"}
    {...props}
  />
);


export const ImageProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  null
);

export const DataMethodProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  null
);



export const SectionStartProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Start section with..."}
    propertyName={"section_start"}
    {...props}
  />
);

export const SectionEndProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <TextProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"End section with..."}
    propertyName={"section_end"}
    {...props}
  />
);



export const RadiusProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Radius"}
    propertyName={"radius"}
    {...props}
  />
);

export const DensityProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <NumericProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Density"}
    propertyName={"density"}
    {...props}
  />
);




export const TodayProperty = ({newQuestion, newQuestionDispatch, ...props}) => (
  <BooleanProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name={"Today"}
    propertyName={"today"}
    {...props}
  />
);

export const TextArrayProperty = ({newQuestion, newQuestionDispatch, name, propertyName}) => {
  const [elementAdded, setElementAdded] = useState(false);

  if(newQuestion[propertyName] === undefined) newQuestion[propertyName] = [];

  const handleChange = (index, event) => {
    newQuestion[propertyName][index] = event.target.value;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion}
    });
  };

  const handleAddOptionClick = event => {
    newQuestion[propertyName] = [...newQuestion[propertyName], "option " + (newQuestion[propertyName].length + 1)];
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion}
    });
    setElementAdded(true);
  }

  const handleRemoveOptionClick = (index, event) => {
    let newElements = [...newQuestion[propertyName]];
    newElements.splice(index, 1);
    newQuestion[propertyName] = newElements;
    newQuestionDispatch({
      type: "SET_QUESTION",
      question: { ...newQuestion}
    });
  };

  const renderElements = () => newQuestion[propertyName].map((option, index) => (
    <TextField
      autoFocus={elementAdded ? index === newQuestion[propertyName].length - 1 : false}
      style={{ margin: "0.2em 0" }}
      placeholder={name}
      type="text"
      fullWidth
      value={option}
      onChange={e => handleChange(index, e)}
      InputProps={getInputProps(index)}
    />
  ))

  const getInputProps = (index) => ({
    endAdornment: (
      <InputAdornment position="end" margin="0">
        <IconButton
          edge="end"
          onClick={e => handleRemoveOptionClick(index, e)}
          style={{margin: "0", padding: "0"}}
        >
          <DeleteIcon/>
        </IconButton>
      </InputAdornment>
    )
  });

  return <>
    <h4>{name}</h4>
    <Button onClick={handleAddOptionClick}>
      add {name}
    </Button>
    <Box
      fullWidth
      // height="200px"
      height="200px"
      overflow="scroll"
      style={{ margin: "0", overflowX: "hidden" }}
    >
      {renderElements()}
    </Box>
  </>

}


export const TextOptionsProperty = ({newQuestion, newQuestionDispatch}) =>
  <TextArrayProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name="Options"
    propertyName="options"
  />

export const LabelOptionsProperty = ({newQuestion, newQuestionDispatch}) =>
  <TextArrayProperty
    newQuestion={newQuestion}
    newQuestionDispatch={newQuestionDispatch}
    name="Labels"
    propertyName="labels"
  />

