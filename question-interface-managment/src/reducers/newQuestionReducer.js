export const newQuestionReducer = (state, action) => {
  switch(action.type) {
    case "SET_QUESTION":
      return action.question;
    default:
      return state;
  }
}