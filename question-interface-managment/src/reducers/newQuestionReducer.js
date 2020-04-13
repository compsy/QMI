export const newQuestionReducer = (state, action) => {
  switch(action.type) {
    case "SET_QUESTION":
      if(Object.is(state, action.question)) return state;
      return action.question;
    default:
      return state;
  }
};