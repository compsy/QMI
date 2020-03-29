export const settingsReducer = (state, action) => {
  switch(action.type) {
    case "SET_DESTINATION_INDEX":
      return {...state, destinationIndex: action.destinationIndex};
    case 'TOGGLE_GRID_AREAS':
      return {...state, showGridAreas: !state.showGridAreas};
    default:
      return state;
  }
}