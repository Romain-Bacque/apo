export const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SAVE_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.event],
      };
    default:
      return state;
  }
};

export default eventReducer;
