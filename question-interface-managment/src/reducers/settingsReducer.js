export const settingsReducer = (state, action) => {
  switch(action.type) {
    case 'TOGGLE_GRID_AREAS':
      return {...state, showGridAreas: !state.showGridAreas};
    default:
      return state;
  }
}