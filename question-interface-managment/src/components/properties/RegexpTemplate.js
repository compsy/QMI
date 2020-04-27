import React from 'react'

export const RegexpProperty = ({
  newQuestion,
  newQuestionDispatch,
  name,
  propertyName,
  regexp,
  helperText,
  ...props
}) => {
  const validate = (input) => {
    if (input === "" || input === undefined) return true;
    const output = input.match(regexp);
    if (output == null) return false;
    return output[0] === input;
  };
  const id = uuidv4();
  const [state, setState] = useState({
    valid: validate(newQuestion[propertyName]),
  });
  const getNewState = () => ({ valid: validate(newQuestion[propertyName]) });
  const handleChange = (event) => {
    newQuestion[propertyName] = event.target.value;
    setState(getNewState());
  };

  return (
    <TextField
      key={id}
      autoFocus
      error={!state.valid}
      variant="outlined"
      margin="dense"
      fullWidth
      id={"outlined-error-helper-text"}
      value={newQuestion[propertyName]}
      helperText={state.valid ? "" : helperText}
      onChange={handleChange}
      label={name}
      {...props}
    />
  );
};