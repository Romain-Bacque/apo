
const initialState = {
 open : false,
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
}

export default reducer;