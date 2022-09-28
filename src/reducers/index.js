const initialState = {
  open : false
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_VALUE': // pour ajouter un champ controller
      return {
        ...state,
        [action.key]: action.value,
        // la notation entre crochet me permet de spécifier
        // via une expression le nom de la propriété cliblée
      };
    case 'OPEN_MENU':
      return {
        ...state,
        open: !state.open,
      };
      case 'CLOSE_MENU':
      return {
        ...state,
        open: state.open,
      };
    default:
      return state;
  }
}

export default reducer;
