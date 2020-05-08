export const newQuestionReducer = (state, action) => {
    if (action.type === "SET_QUESTION") {
        if (Object.is(state, action.question)) return state;
        return action.question;
    } else {
        return state;
    }
};