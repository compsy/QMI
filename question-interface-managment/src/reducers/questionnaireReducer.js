import uuid from "uuid/v1";

export const questionnaireReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUESTION":
      const uniq = uuid();
      return [
        ...state,
        {
          id: uniq,
          type: action.questionType.toLowerCase(),
          title: "untitled " + action.questionType,
          options: ["option 1", "option 2", "option 3", "option 4"]
        }
      ];
    case "REMOVE_QUESTION":
      return state.filter(question => question.id !== action.id);
    case "UPDATE_QUESTION":
      return state.map(question =>
        question.id === action.id ? action.new : question
      );
    default:
      return state;
  }
};
